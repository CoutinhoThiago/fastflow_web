// src/services/authService.ts
import { usuariosMock, type Usuario } from '../data/mock';

export type Role = 'MEDICO' | 'ATENDENTE';

export interface User {
  id: number;
  nome: string;
  role: Role;
}

export async function loginSimulado(username: string, password: string): Promise<User> {
  await new Promise(r => setTimeout(r, 300));

  const usuario: Usuario | undefined = usuariosMock.find(
    u => u.username === username && u.password === password
  );

  if (!usuario) {
    throw new Error('Usuário ou senha inválidos');
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    role: usuario.role,
  };
}
