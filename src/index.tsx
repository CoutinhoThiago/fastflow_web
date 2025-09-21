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
  avgMinutes: number;
}

export interface Atendimento {
  id: string;
  codigo: string;
  pacienteName: string;
  pacienteCpf: string;
  exames: Exam[];
  horarioChegada: string;
  sesiId?: string;
  status: 'EM_ESPERA' | 'EM_ATENDIMENTO' | 'FINALIZADO';
  profissionalId?: string;
}
