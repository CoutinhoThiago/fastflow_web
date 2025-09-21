// src/pages/MedicoPage.tsx
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { colors } from "../styles/colors";

interface Exame {
  nome: string;
  tempoEspera: number;
  status: "Aguardando" | "Em Atendimento" | "Finalizado";
}

interface PacienteAtendimento {
  id: number;
  nome: string;
  cpf: string;
  exames: Exame[];
  codigo: string; 
  status?: "Aguardando" | "Em Atendimento" | "Finalizado";
}

const pacientesMock: PacienteAtendimento[] = [
  {
    id: 1,
    nome: "Carlos A. Mário",
    cpf: "111.111.111-11",
    exames: [{ nome: "Raio X", tempoEspera: 30, status: "Aguardando" }],
    codigo: "DEF456",
    status: "Aguardando",
  },
  {
    id: 2,
    nome: "Thiago C. Silva",
    cpf: "222.222.222-22",
    exames: [{ nome: "Ressonância", tempoEspera: 50, status: "Aguardando" }],
    codigo: "ABC123",
    status: "Aguardando",
  },
];

const formatSeconds = (secs: number) => {
  const s = String(secs % 60).padStart(2, "0");
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  return `00:${m}:${s}`;
};

const MedicoPage: React.FC = () => {
  const [pacientes, setPacientes] = useState(pacientesMock);
  const [pacienteChamado, setPacienteChamado] =
    useState<PacienteAtendimento | null>(null);
  const chamadoStartedAtRef = useRef<number | null>(null);
  const [chamadoElapsed, setChamadoElapsed] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (chamadoStartedAtRef.current) {
        setChamadoElapsed(
          Math.floor((Date.now() - chamadoStartedAtRef.current) / 1000)
        );
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const iniciarAtendimento = () => {
    if (pacienteChamado) {
      const atualizado = { ...pacienteChamado, status: "Em Atendimento" };
      setPacientes((prev) =>
        prev.map((p) => (p.id === atualizado.id ? atualizado : p))
      );
      setPacienteChamado(atualizado);
      chamadoStartedAtRef.current = Date.now();
      setChamadoElapsed(0);
    }
  };

  const cancelarAtendimento = () => {
    if (pacienteChamado) {
      setPacientes((prev) =>
        prev.map((p) =>
          p.id === pacienteChamado.id ? { ...p, status: "Aguardando" } : p
        )
      );
      setPacienteChamado(null);
      chamadoStartedAtRef.current = null;
      setChamadoElapsed(0);
    }
  };

  const finalizarAtendimento = () => {
    if (pacienteChamado) {
      setPacientes((prev) =>
        prev.map((p) =>
          p.id === pacienteChamado.id ? { ...p, status: "Finalizado" } : p
        )
      );
      setPacienteChamado(null);
      chamadoStartedAtRef.current = null;
      setChamadoElapsed(0);
    }
  };

  const chamarProximo = () => {
    if (!pacienteChamado) {
      const primeiro = pacientes
        .filter((p) => p.status === "Aguardando")
        .sort((a, b) => a.id - b.id)[0];
      if (primeiro) {
        setPacienteChamado(primeiro);
        chamadoStartedAtRef.current = Date.now();
        setChamadoElapsed(0);
      }
      return;
    }

    const proximo = pacientes
      .filter((p) => p.status === "Aguardando" && p.id > pacienteChamado.id)
      .sort((a, b) => a.id - b.id)[0];

    if (proximo) {
      setPacienteChamado(proximo);
      chamadoStartedAtRef.current = Date.now();
      setChamadoElapsed(0);
    } else {
      setPacienteChamado(null);
      chamadoStartedAtRef.current = null;
      setChamadoElapsed(0);
    }
  };

  const proximoPaciente = pacienteChamado
    ? pacientes
        .filter((p) => p.status === "Aguardando" && p.id > pacienteChamado.id)
        .sort((a, b) => a.id - b.id)[0]
    : pacientes
        .filter((p) => p.status === "Aguardando")
        .sort((a, b) => a.id - b.id)[0];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background:colors.background,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 900,
          margin: "120px auto",
          background: colors.background,
          borderRadius: 8,
          padding: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1 style={{ color: colors.borderBlue, margin: 0, fontSize: 38 }}>
              Dr. Raphael
            </h1>
            <p style={{ color: "#444", margin: "6px 0 0", fontSize: 20 }}>
              Cardiologista
            </p>
          </div>

        </div>

        <hr
          style={{
            border: "none",
            borderTop: `2px solid ${colors.borderBlue}`,
            margin: "14px 0 24px",
          }}
        />
        <section style={{ marginBottom: 30 }}>
          <h2
  style={{
    color: colors.tealLight,
    fontSize: 20,
    margin: "0 0 12px",
  }}
>
  {pacienteChamado
    ? pacienteChamado.status === "Em Atendimento"
      ? "Paciente em atendimento"
      : "Chamando"
    : "Nenhum paciente"}
</h2>
          {pacienteChamado ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f5f5f5",
                padding: "12px 18px",
                borderRadius: 6,
                gap: 10,
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 18 }}>
                  {pacienteChamado.nome}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 15 }}>
                  Senha: <strong>{pacienteChamado.codigo}</strong>
                </p>
                        </div>
                            <div>
                <p style={{ margin: 0, fontSize: 14 }}>
                  {pacienteChamado.status === "Em Atendimento"
                    ? "Tempo de atendimento:"
                    : "Tempo de espera:"}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {formatSeconds(chamadoElapsed)}
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {pacienteChamado.status !== "Em Atendimento" ? (
                  <>
                    <button
                      onClick={iniciarAtendimento}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        background: colors.tealLight,
                        color: colors.background,
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Iniciar
                    </button>
                    <button
                      onClick={cancelarAtendimento}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 6,
                        border: "none",
                        background: "#aaa",
                        backgroundColor: colors.background,
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={finalizarAtendimento}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      background: "red",
                      color: colors.background,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f5f5f5",
                padding: "12px 18px",
                borderRadius: 6,
                gap: 10,
              }}
            >
              ---
            </div>
          )}
        </section>
<section style={{ marginBottom: 30 }}>
  <h2
    style={{
      color: colors.tealLight,
      fontSize: 20,
      margin: "0 0 12px",
    }}
  >
    Próximo paciente
  </h2>
  {proximoPaciente ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "12px 18px",
        borderRadius: 6,
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 18 }}>{proximoPaciente.nome}</p>
        <p style={{ margin: "4px 0 0", fontSize: 15 }}>
          Senha: <strong>{proximoPaciente.codigo}</strong>
        </p>
      </div>
      <button
        onClick={chamarProximo}
        style={{
          padding: "8px 16px",
          borderRadius: 6,
          border: "none",
          color: colors.cardBg,
          fontWeight: "bold",
          cursor: pacienteChamado?.status === "Em Atendimento" ? "not-allowed" : "pointer",
          backgroundColor: pacienteChamado?.status === "Em Atendimento" ? "#f0f0f0" : colors.tealLight,

        }}
        disabled={pacienteChamado?.status === "Em Atendimento"}
      >
        Chamar
      </button>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "12px 18px",
        borderRadius: 6,
        gap: 10,
      }}
    >
      ---
    </div>
)}
</section>
        <section>
          <h2
            style={{ color: colors.tealLight, fontSize: 20, margin: "0 0 12px" }}
          >
            Na fila:
          </h2>
          <p
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: colors.borderBlue,
              margin: 0,
            }}
          >
            {pacientes.filter((p) => p.status === "Aguardando").length}
          </p>
        </section>
      </main>
    </div>
  );
};

export default MedicoPage;
