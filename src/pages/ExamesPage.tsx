// src/pages/ExamesPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { pacientesFilaMock, type PacienteFila } from "../data/mock";
import { colors } from "../styles/colors";

const ExamesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pacienteState = location.state as PacienteFila | undefined;
  const [pacienteEncontrado, setPacienteEncontrado] = useState<PacienteFila | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (pacienteState) {
      setPacienteEncontrado(pacienteState);
    } else {
      navigate("/fila");
    }
  }, [pacienteState, navigate]);

  const normalize = (s: string) => s.replace(/\D/g, "");

  const handleSearch = () => {
    const term = search.trim();
    if (!term) return alert("Digite CPF ou código.");

    const termDigits = normalize(term);
    const termLower = term.toLowerCase();

    const paciente = pacientesFilaMock.find(
      (p) => p.cpf === termDigits || p.codigo.toLowerCase() === termLower
    );

    if (paciente) {
      setPacienteEncontrado(paciente);
      navigate("/exames", { state: paciente });
    } else {
      alert("Paciente não encontrado!");
      setPacienteEncontrado(null);
    }
  };

  if (!pacienteEncontrado) return null;

  // cálculo de tempo total
  const tempoTotal = pacienteEncontrado.exames
    .filter((e) => e.status !== "Finalizado")
    .reduce((acc, e) => acc + e.tempoEspera, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aguardando":
        return "#ff4d4f"; // vermelho
      case "Chamando":
        return "#ffeaa7"; // amarelo
      case "Em andamento":
        return "#b2bec3"; // cinza
      case "Finalizado":
        return "#2ecc71"; // verde
      default:
        return "#b2bec3";
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Header />

      <main style={{  maxWidth: 1192, margin: "120px auto", padding: "0 20px" }}>
        {/* Título */}
        <h1 style={{ color: "#0070c0", marginBottom: 20 }}>Seus exames</h1>

        {/* Busca */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="CPF"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: "8px 12px",
              fontSize: 15,
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              background: "#009688",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Procurar
          </button>
        </div>

        {/* Card de paciente e total de espera */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20, alignItems: "stretch" }}>
          {/* Card paciente */}
          <div
            style={{
              flex: 2,
              background: "#f0f0f0",
              padding: 16,
              borderRadius: 8,
              fontSize: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <strong>{pacienteEncontrado.nome}</strong>
            <span>CPF: {pacienteEncontrado.cpf}</span>
          </div>

          {/* Card tempo de espera */}
          <div
            style={{
              flex: 1,
              background: "#f0f0f0",
              padding: 16,
              borderRadius: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span style={{ textAlign: "start" }}>
              Total estimado<br />de espera:
            </span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#0070c0" }}>
              {Math.floor(tempoTotal / 60)}h{tempoTotal % 60}min
            </span>
          </div>
        </div>

        {/* Lista de exames */}
        <div
          style={{
            width: "100%", // apenas 100%, sem maxWidth duplicado
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            marginBottom: 30,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            boxSizing: "border-box",
          }}
          >
          {/* Em andamento */}
          {pacienteEncontrado.exames
            .filter((e) => e.status === "Em andamento")
            .map((exame) => (
              <div
                key={exame.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  background: colors.background, // amarelo para em andamento
                  marginBottom: "10px",
                }}
              >
                <div>
                  <strong>{exame.exame}</strong>
                  <p style={{ margin: 0 }}>Sala: {exame.sala}</p>
                  <p style={{ margin: 0 }}>Profissional: {exame.profissional}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{exame.status}</span>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: getStatusColor(exame.status),
                    }}
                  />
              </div>
              </div>
            ))}

          {/* Chamando */}
          {pacienteEncontrado.exames
            .filter((e) => e.status === "Chamando")
            .map((exame) => (
              <div
                key={exame.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#f0f0f0",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <strong>{exame.exame}</strong>
                  <p style={{ margin: 0 }}>Tempo de espera: {exame.tempoEspera} min</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{exame.status}</span>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: getStatusColor(exame.status),
                    }}
                  />
              </div>
              </div>
            ))}

          {/* Aguardando */}
          {pacienteEncontrado.exames
            .filter((e) => e.status === "Aguardando")
            .map((exame) => (
              <div
                key={exame.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#f0f0f0",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <strong>{exame.exame}</strong>
                  <p style={{ margin: 0 }}>Tempo de espera: {exame.tempoEspera} min</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{exame.status}</span>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: getStatusColor(exame.status),
                    }}
                  />
              </div>
              </div>
            ))}

          {/* Finalizados */}
          {pacienteEncontrado.exames
            .filter((e) => e.status === "Finalizado")
            .map((exame) => (
              <div
                key={exame.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#f0f0f0",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <strong>{exame.exame}</strong>
                  <p style={{ margin: 0 }}>Sala: {exame.sala}</p>
                  <p style={{ margin: 0 }}>Profissional: {exame.profissional}</p>
                </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{exame.status}</span>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: getStatusColor(exame.status),
                    }}
                  />
              </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default ExamesPage;
