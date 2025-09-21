// src/components/PatientCard.tsx
import React from 'react';
import { Atendimento } from '../types';

export const PatientCard: React.FC<{ atendimento: Atendimento }> = ({ atendimento }) => {
  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{atendimento.pacienteName}</h3>
      <p className="text-sm text-gray-600">{atendimento.pacienteCpf} • Código: {atendimento.codigo}</p>
      <p className="mt-2 text-sm">Chegada: {new Date(atendimento.horarioChegada).toLocaleString()}</p>
      <div className="mt-2">
        <strong>Exames:</strong>
        <ul className="list-disc list-inside">
          {atendimento.exames.map(e => <li key={e.id}>{e.name} — {e.avgMinutes} min</li>)}
        </ul>
      </div>
      <div className="mt-2 text-sm">Status: {atendimento.status}</div>
    </div>
  );
};
