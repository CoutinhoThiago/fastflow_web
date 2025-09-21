import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { colors } from "../styles/colors";
import { pacientesFilaMock } from "../data/mock";

const CheckInPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [prioridade, setPrioridade] = useState(false);
  const navigate = useNavigate();

  const normalize = (s: string) => s.replace(/\D/g, "");

  const handleSearch = () => {
    const term = search.trim();
    if (!term) {
      alert("Senha do cliente");
      return;
    }

    const termDigits = normalize(term);
    const termLower = term.toLowerCase();

    const paciente = pacientesFilaMock.find(
      (p) => p.cpf === termDigits || p.codigo.toLowerCase() === termLower
    );

    if (paciente) {
      navigate("/exames", { state: { ...paciente, prioridade } });
    } else {
      alert("Paciente não encontrado!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: colors.cardBg,
        fontFamily: "PT Sans, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "flex-end",
          gap: "8px",
          padding: "10px 0px", 
          marginTop: "50px",
        }}
      >
        <div
        style={{
          display: "flex",
          flexDirection: "column", 
          borderRadius: "10px",
          border: `2px solid ${colors.tealLight}`,
        }}>
        <button
          onClick={() => navigate("/checkin")}
          style={{
            background: colors.tealLight,
            border: "none",
            padding: "6px 14px",
            borderRadius: "8px",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          CheckIn
        </button>
        <button
          onClick={() => navigate("/fila")}
          style={{
            background: "#fff",
            border: "none",
            padding: "6px 14px",
            borderRadius: "8px",
            color: colors.tealLight,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Consulta
        </button>
        </div>
      </div>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px 80px",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: 70,
            marginBottom: "10px",
            lineHeight: 1.2,
            color: colors.borderBlue,
          }}
        >
          CheckIn
        </h1>
        <p style={{ marginBottom: "18px", color: "#555", fontSize: 30 }}>
          Vamos melhorar o dia de alguem hoje?
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Senha do cliente"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "20px 160px 20px 24px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                width: "280px",
                fontSize: 15,
              }}
            />
            <Search
              size={18}
              color="#888"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            style={{
              padding: "20px 24px",
              background: colors.tealLight,
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            CheckIn
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            onClick={() => setPrioridade(!prioridade)}
            style={{
              width: "50px",
              height: "28px",
              borderRadius: "999px",
              background: prioridade ? colors.tealLight : "#ccc",
              position: "relative",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#fff",
                position: "absolute",
                top: "50%",
                left: prioridade ? "26px" : "4px",
                transform: "translateY(-50%)",
                transition: "left 0.3s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <span style={{ fontSize: 20, color: "#333" }}>
            Cliente com prioridade
          </span>
        </div>
      </main>
    </div>
  );
};

export default CheckInPage;
