import type { Atendimento } from "..";

export function estimateWaitMinutes(queue: Atendimento[], indexOfPatient: number) {
  if (indexOfPatient < 0) return 0;
  let sum = 0;
  for (let i = 0; i < indexOfPatient; i++) {
    const at = queue[i];
    if (at && at.exames && at.exames.length > 0) sum += at.exames[0].avgMinutes;
  }
  return sum;
}

export function formatMinutes(m: number) {
  if (m <= 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h}h ${mm}m`;
}
