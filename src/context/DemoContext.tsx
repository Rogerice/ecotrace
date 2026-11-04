import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { seedMovements } from '../data/mock'
import type { Movement, MovementDraft, MovementStatus } from '../types'

const STORAGE_KEY = 'ecotrace-demo-v1'

function loadMovements(): Movement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.every(item => item && typeof item === 'object' && typeof item.id === 'string' && typeof item.quantity === 'number' && Number.isFinite(item.quantity) && item.quantity >= 0)) return parsed as Movement[]
    }
  } catch { /* Navegador sem storage: usa dados de demonstração. */ }
  return seedMovements.map(item => ({ ...item }))
}

interface DemoContextValue {
  movements: Movement[]
  createMovement: (draft: MovementDraft) => Movement
  updateStatus: (id: string, status: MovementStatus) => void
  resetDemo: () => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({children}: {children:ReactNode}) {
  const [movements,setMovements] = useState<Movement[]>(loadMovements)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(movements)) } catch { /* Só dura nesta sessão. */ }
  },[movements])

  const createMovement = useCallback((draft: MovementDraft): Movement => {
    const now = new Date()
    const unique = (typeof crypto !== 'undefined' && 'randomUUID' in crypto) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    const movement: Movement = {
      ...draft,
      id: unique,
      documentNumber: `ECO-${now.getFullYear()}-${String(Date.now()).slice(-7)}`,
      status: 'Em trânsito'
    }
    setMovements(previous => [movement,...previous])
    return movement
  },[])

  const updateStatus = useCallback((id: string,status: MovementStatus) => setMovements(previous => previous.map(item => item.id === id ? {...item,status} : item)),[])
  const resetDemo = useCallback(() => setMovements(seedMovements.map(item=>({...item}))),[])
  return <DemoContext.Provider value={{movements,createMovement,updateStatus,resetDemo}}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const value = useContext(DemoContext)
  if (!value) throw new Error('useDemo deve ser usado dentro de DemoProvider')
  return value
}
