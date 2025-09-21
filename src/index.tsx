export type Role = 'MEDICO' | 'ATENDENTE' | 'TECNICO' | 'PACIENTE';

export interface User {
  id: string;
  name: string;
  cpf: string;
  role: Role;
  token?: string;
}

export interface Exam {
  id: number;
  name: string;
  avgMinutes: number; // tempo médio por exame
}

export interface Atendimento {
  id: string;
  codigo: string;
  pacienteName: string;
  pacienteCpf: string;
  exames: Exam[];
  horarioChegada: string; // ISO
  sesiId?: string;
  status: 'EM_ESPERA' | 'EM_ATENDIMENTO' | 'FINALIZADO';
  profissionalId?: string; // id do medico/tecnico que está atendendo
}
