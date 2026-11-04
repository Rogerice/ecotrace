import type { Movement, Treatment, WasteGroup, MovementStatus } from '../types'

export const DEMO_COMPANY = 'Horizonte Verde Indústria Ltda.'
export const TRANSPORTERS = ['TransLog Ambiental Ltda.', 'Rota Circular Transportes', 'EcoMov Logística']
export const DESTINATIONS = ['Central de Reciclagem Vale Verde', 'Unidade Ambiental Santa Clara', 'Centro de Tratamento Circular']
export const DRIVERS = ['Carlos Almeida', 'Mariana Costa', 'Felipe Nascimento']
export const VEHICLES = ['FTR-2A45', 'TRK-8B13', 'ECO-4C27']
export const WASTES = ['Papel e papelão', 'Plásticos', 'Madeira', 'Resíduos orgânicos', 'Metais', 'Vidro', 'Resíduos industriais', 'Entulho e concreto']
export const TREATMENTS: Treatment[] = ['Reciclagem', 'Compostagem', 'Aterro industrial', 'Coprocessamento', 'Reutilização']
export const GROUPS: WasteGroup[] = ['Classe I – Perigoso', 'Classe II A – Não inerte', 'Classe II B – Inerte']

const entries: Array<[string, string, number, MovementStatus, Treatment, WasteGroup, number]> = [
  ['2026-11-03','Papel e papelão',2.35,'Destinado','Reciclagem','Classe II A – Não inerte',0],
  ['2026-11-01','Plásticos',1.82,'Em trânsito','Reciclagem','Classe II A – Não inerte',1],
  ['2026-10-27','Madeira',4.60,'Destinado','Reutilização','Classe II B – Inerte',2],
  ['2026-10-21','Resíduos orgânicos',3.15,'Destinado','Compostagem','Classe II A – Não inerte',0],
  ['2026-10-18','Metais',5.43,'Destinado','Reciclagem','Classe II B – Inerte',1],
  ['2026-10-12','Resíduos industriais',0.75,'Pendente','Coprocessamento','Classe I – Perigoso',2],
  ['2026-09-24','Entulho e concreto',8.20,'Destinado','Reciclagem','Classe II B – Inerte',0],
  ['2026-09-06','Vidro',1.27,'Em trânsito','Reciclagem','Classe II A – Não inerte',1],
  ['2026-08-19','Plásticos',2.96,'Destinado','Reciclagem','Classe II A – Não inerte',2],
  ['2026-07-11','Madeira',6.85,'Destinado','Reutilização','Classe II B – Inerte',0],
  ['2026-06-08','Resíduos orgânicos',4.18,'Destinado','Compostagem','Classe II A – Não inerte',1],
  ['2026-05-16','Resíduos industriais',0.92,'Destinado','Aterro industrial','Classe I – Perigoso',2],
  ['2026-04-17','Metais',3.74,'Destinado','Reciclagem','Classe II B – Inerte',0],
  ['2026-03-12','Papel e papelão',1.63,'Destinado','Reciclagem','Classe II A – Não inerte',1],
  ['2026-02-04','Plásticos',2.39,'Destinado','Reciclagem','Classe II A – Não inerte',2],
  ['2026-01-08','Entulho e concreto',7.18,'Destinado','Reutilização','Classe II B – Inerte',0]
]

export const seedMovements: Movement[] = entries.map(([createdAt, wasteType, quantity, status, treatment, group, idx], i) => ({
  id: `seed-${i + 1}`,
  documentNumber: `ECO-2026-${String(160 - i).padStart(4,'0')}`,
  createdAt, wasteType, quantity, status, treatment, group,
  generator: DEMO_COMPANY,
  transporter: TRANSPORTERS[idx],
  destination: DESTINATIONS[idx],
  driver: DRIVERS[idx],
  vehicle: VEHICLES[idx],
  invoice: `NF-${String(12050 + i)}`,
  observations: 'Operação fictícia cadastrada exclusivamente para demonstração.'
}))
