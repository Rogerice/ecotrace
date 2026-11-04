export type MovementStatus = 'Em trânsito' | 'Destinado' | 'Pendente'
export type WasteGroup = 'Classe I – Perigoso' | 'Classe II A – Não inerte' | 'Classe II B – Inerte'
export type Treatment = 'Reciclagem' | 'Compostagem' | 'Aterro industrial' | 'Coprocessamento' | 'Reutilização'

export interface Movement {
  id: string
  documentNumber: string
  createdAt: string
  generator: string
  transporter: string
  destination: string
  driver: string
  vehicle: string
  wasteType: string
  group: WasteGroup
  treatment: Treatment
  quantity: number
  status: MovementStatus
  invoice: string
  observations: string
}

export type MovementDraft = Omit<Movement, 'id' | 'documentNumber' | 'status'>
