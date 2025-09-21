import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AtendentePage: React.FC = () => {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [prioridade, setPrioridade] = useState(false);

  const handleCheckIn = () => {
    if (!senha.trim()) {
      alert("Digite a senha do cliente.");
      return;
    }
    console.log("Check-in realizado:", { senha, prioridade });
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "white",
      fontFamily: '"Segoe UI", Arial, sans-serif',
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      padding: "2rem",
      textAlign: "center" as const,
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#0072ce",
      marginBottom: "0.5rem",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#333",
      marginBottom: "2rem",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
      width: "300px",
      maxWidth: "90%",
      border: "1px solid #ccc",
      borderRadius: "50px",
      padding: "0.5rem 1rem",
      marginBottom: "1.5rem",
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "1rem",
      color: "#333",
      background: "transparent",
    },
    searchButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "1.2rem",
    },
    toggle: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1.5rem",
      fontSize: "1rem",
      color: "#333",
    },
    checkbox: {
      width: "20px",
      height: "20px",
      accentColor: "#1abc9c",
      cursor: "pointer",
    },
    checkinButton: {
      backgroundColor: "#1abc9c",
      border: "none",
      color: "white",
      padding: "0.7rem 2rem",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.2s ease",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    checkinButtonHover: {
      backgroundColor: "#16a085",
    },
    illustration: {
      marginTop: "2rem",
      opacity: 0.7,
    },
    illustrationImg: {
      maxWidth: "200px",
      height: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <Header/>

      <main style={styles.content}>
        <h1 style={styles.title}>CheckIn</h1>
        <p style={styles.subtitle}>Vamos melhorar o dia de alguém hoje?</p>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Senha do Cliente"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />
          <button style={styles.searchButton} onClick={handleCheckIn}>
            🔍
          </button>
        </div>

        <div style={styles.toggle}>
          <label>Cliente com prioridade?</label>
          <input
            type="checkbox"
            checked={prioridade}
            onChange={(e) => setPrioridade(e.target.checked)}
            style={styles.checkbox}
          />
        </div>

        <button
          style={styles.checkinButton}
          onClick={handleCheckIn}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor =
              styles.checkinButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor =
              styles.checkinButton.backgroundColor)
          }
        >
          CheckIn
        </button>

        <div style={styles.illustration}>
          <img
            src="/undraw_searching.svg"
            alt="Ilustração"
            style={styles.illustrationImg}
          />
        </div>
      </main>
    </div>
  );
};

export default AtendentePage;
