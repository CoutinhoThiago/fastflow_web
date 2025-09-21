import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../styles/colors';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: colors.redBtn }}>404</h1>
      <p style={{ marginBottom: '20px', fontSize: '20px' }}>Página não encontrada</p>
      <Link to="/" style={{ color: colors.borderBlue, textDecoration: 'underline', fontSize: '18px' }}>Voltar para a página inicial</Link>
    </div>
  );
};
