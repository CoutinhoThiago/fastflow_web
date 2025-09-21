// src/pages/FilaPage.tsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { colors } from "../styles/colors";
import { pacientesFilaMock } from "../data/mock";

const FilaPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const normalize = (s: string) => s.replace(/\D/g, "");

  const handleSearch = () => {
    const term = search.trim();
    if (!term) {
      alert("Digite CPF ou código.");
      return;
    }

    const termDigits = normalize(term);
    const termLower = term.toLowerCase();

    const paciente = pacientesFilaMock.find(
      (p) => p.cpf === termDigits || p.codigo.toLowerCase() === termLower
    );

    if (paciente) {
      navigate("/exames", { state: paciente });
    } else {
      alert("Paciente não encontrado!");
    }
  };

  return (
    <div style={{ width: "100%", background: colors.cardBg, fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Navegação logo abaixo do Header */}
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
                          background: colors.cardBg,
                          border: "none",
                          padding: "6px 14px",
                          borderRadius: "8px",
                          color: colors.tealLight,
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
                        Consulta
                      </button>
                      </div>
            </div>


      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px 80px", position: "relative" }}>
        <h1 style={{ fontSize: 38, marginBottom: "10px", lineHeight: 1.2, color: colors.borderBlue }}>
          Consulte<br />seus exames
        </h1>
        <p style={{ marginBottom: "28px", color: "#555", fontSize: 16 }}>Todos seus exames na palma da sua mão.</p>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="CPF ou código"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "10px 40px 10px 12px", border: "1px solid #ccc", borderRadius: "8px", outline: "none", width: "280px", fontSize: 15 }}
            />
            <Search size={18} color="#888" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <button
            onClick={handleSearch}
            style={{ padding: "11px 20px", background: colors.tealLight, border: "none", borderRadius: "8px", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 15 }}
          >
            Procurar
          </button>
        </div>
      </main>
    </div>
  );
};

export default FilaPage;
