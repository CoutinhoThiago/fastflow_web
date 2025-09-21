import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSimulado, type User } from '../services/authService';
import { colors } from '../styles/colors';
import Header from '../components/Header';

export const LoginPage: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    try {
      const user: User = await loginSimulado(cpf, password);
      if (user.role === 'MEDICO') navigate('/medico');
      else if (user.role === 'ATENDENTE') navigate('/checkin');
    } catch (err) {
      setErro('CPF ou senha inválidos');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.background,
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
      }}
    >
      {/* Header agora vem do componente */}
      <Header showLogout={false} />
      <div style={{ height: 72 }} /> {/* espaçamento para compensar o header fixo */}

      {/* Main card (split) */}
      <main
        style={{
          width: '100%',
          maxWidth: 1192,
          height: '595px',
          display: 'flex',
          background: colors.cardBg,
          borderRadius: 12,
          border: `2px solid ${colors.borderBlue}`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(20,30,40,0.12)',
        }}
      >
        {/* Left panel - artwork */}
        <section
          style={{
            flex: 1.05,
            background: `linear-gradient(180deg, ${colors.tealLight}, ${colors.tealDark})`,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch',
            position: 'relative',
            padding: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              borderRadius: '12px 0 0 12px',
              pointerEvents: 'none',
              overflow: 'hidden',
              display: 'block',
              zIndex: 1,
              boxShadow: 'inset 0 6px 18px rgba(0,0,0,0.06)',
            }}
          >
            <img
              src="/assets/login_image.png"
              alt="Trabalhador"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        </section>

        {/* Right panel - form */}
        <section
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 36,
            position: 'relative',
            background: colors.cardBg,
          }}
        >
          {/* Right card */}
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              borderRadius: 12,
              padding: 28,
              background: colors.cardBg,
              boxSizing: 'border-box',
              boxShadow: '0 8px 24px rgba(30,40,50,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: `linear-gradient(180deg, ${colors.tealLight}, ${colors.tealDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/assets/sinapti_logo1.png"
                  alt="SinapTI"
                  style={{ width: 40, height: 40, objectFit: 'contain' }}
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <input
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                style={{
                  padding: '14px 16px',
                  fontSize: 15,
                  borderRadius: 10,
                  border: '1.5px solid #ddd',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '14px 16px',
                  fontSize: 15,
                  borderRadius: 10,
                  border: '1.5px solid #ddd',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <a
                  href="#"
                  style={{
                    fontSize: 13,
                    color: colors.borderBlue,
                    textDecoration: 'none',
                  }}
                >
                  Problemas com acesso?
                </a>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 6,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.cardBg,
                  background: colors.greenBtn,
                  fontWeight: 700,
                  fontSize: 15,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.opacity = '0.92';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Entrar
              </button>

              {erro && (
                <div style={{ color: colors.redBtn, marginTop: 6 }}>{erro}</div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 14,
                  color: colors.mutedText,
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>© 2025 SinapTI</div>
                  <div style={{ display: 'flex', fontSize: 8 }}>
                    Referencia em inovação
                  </div>
                </div>
                <div>Versão 1.0</div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};
