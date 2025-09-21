// Usuários do sistema
export interface Usuario {
  id: number;
  nome: string;
  role: "MEDICO" | "ATENDENTE";
  username: string;
  password: string;
}

export const usuariosMock: Usuario[] = [
  {
    id: 1,
    nome: "Dr. João",
    role: "MEDICO",
    username: "medico",
    password: "12345678",
  },
  {
    id: 2,
    nome: "Ana",
    role: "ATENDENTE",
    username: "atendente",
    password: "12345678",
  },
];

// Pacientes antigos (não usados na fila, mas mantive para referência)
export interface Exame {
  nome: string;
  tempoEspera: number;
  status: "Aguardando" | "Em Atendimento" | "Finalizado" | "Descaso";
}

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  exames: Exame[];
}

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "123.456.789-00",
    exames: [
      { nome: "Ressonância", tempoEspera: 20, status: "Aguardando" },
      { nome: "Raio X", tempoEspera: 40, status: "Finalizado" },
      { nome: "Exame de Sangue", tempoEspera: 50, status: "Em Atendimento" },
    ],
  },
  {
    id: 2,
    nome: "Maria Souza",
    cpf: "987.654.321-00",
    exames: [
      { nome: "Ressonância", tempoEspera: 15, status: "Aguardando" },
      { nome: "Exame de Sangue", tempoEspera: 25, status: "Aguardando" },
    ],
  },
];

// Pacientes da fila
// src/data/mock.ts
export interface ExameFila {
  id: number;
  exame: string;
  tempoEspera: number;
  status: "Aguardando" | "Em Atendimento" | "Finalizado" | "Chamando" | "Em andamento";
  sala?: string;
  profissional?: string;
}

export interface PacienteFila {
  cpf: string;    // armazenamos sem pontuação: ex: "12345678900"
  codigo: string;
  nome: string;
  exames: ExameFila[];
}

export const pacientesFilaMock: PacienteFila[] = [
  {
    cpf: "12345678900",
    codigo: "ABC123",
    nome: "João Silva",
    exames: [
      { id: 1, exame: "Raio X", tempoEspera: 30, status: "Aguardando" },
      { id: 2, exame: "Ressonância", tempoEspera: 40, status: "Finalizado", sala: "Sala 2", profissional: "Dr. Ana" },
      { id: 6, exame: "Ultrassom", tempoEspera: 50, status: "Aguardando" },
      { id: 7, exame: "Tomografia", tempoEspera: 0, status: "Finalizado", sala: "Sala 5", profissional: "Dra. Beatriz" },
      { id: 8, exame: "Endoscopia", tempoEspera: 60, status: "Chamando" },
      { id: 9, exame: "Eletrocardiograma", tempoEspera: 0, status: "Em andamento", sala: "Sala 4", profissional: "Dr. Carlos" },
    ],
  },
  {
    cpf: "08866966584",
    codigo: "DEF456",
    nome: "Maria Souza",
    exames: [
      { id: 3, exame: "Exame de Sangue", tempoEspera: 20, status: "Em Atendimento", sala: "Sala 3", profissional: "Dr. Thiago" },
      { id: 4, exame: "Raio X", tempoEspera: 30, status: "Aguardando" },
      { id: 5, exame: "Ressonância", tempoEspera: 40, status: "Finalizado", sala: "Sala 1", profissional: "Dr. João" },
      { id: 8, exame: "Endoscopia", tempoEspera: 60, status: "Chamando" },
      { id: 9, exame: "Eletrocardiograma", tempoEspera: 0, status: "Finalizado", sala: "Sala 4", profissional: "Dr. Carlos" },
    ],
  },
];
