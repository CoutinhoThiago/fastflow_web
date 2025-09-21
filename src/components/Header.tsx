import React, { useEffect, useState } from "react";
import { colors } from "../styles/colors";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  showLogout?: boolean; // default: true
}

const Header: React.FC<HeaderProps> = ({ showLogout = true }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
      setDate(now.toLocaleDateString("pt-BR"));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "12px 0",
        background: `linear-gradient(90deg, ${colors.tealDark}, ${colors.tealLight})`,
        color: colors.cardBg,
        boxSizing: "border-box",
        boxShadow: "0 4px 18px rgba(8,20,30,0.12)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        {/* Logo + título */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/sinapti_logo1.png"
              alt="SinapTI"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Fast Flow</div>
            <div style={{ fontSize: 12, opacity: 0.95 }}>by SinapTI</div>
          </div>
        </div>

        {/* Data e hora + logout (opcional) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 12,
          }}
        >
          <div style={{ textAlign: "right", lineHeight: 1.2 }}>
            <div style={{ fontWeight: 700 }}>{time}</div>
            <div style={{ fontWeight: 700 }}>{date}</div>
          </div>

          {showLogout && (
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "transparent",
                border: "none",
                color: colors.cardBg,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
