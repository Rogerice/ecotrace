import type { Movement } from '../types'

export const totalTons = (data: Movement[]) => data.reduce((sum, movement) => sum + movement.quantity, 0)
export const destinedTons = (data: Movement[]) => totalTons(data.filter(item => item.status === 'Destinado'))
export const transitTons = (data: Movement[]) => totalTons(data.filter(item => item.status === 'Em trânsito'))
export const pendingTons = (data: Movement[]) => totalTons(data.filter(item => item.status === 'Pendente'))
export const destinationPct = (data: Movement[]) => totalTons(data) ? destinedTons(data) / totalTons(data) * 100 : 0

export const byMonth = (data: Movement[]) => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return months.map((name, month) => {
    const list = data.filter(item => Number(item.createdAt.slice(0,4)) === 2026 && Number(item.createdAt.slice(5,7)) === month + 1)
    return { name, gerado: Number(totalTons(list).toFixed(2)), destinado: Number(destined(list).toFixed(2)) }
  })
}
const destined = destinedTons

export const byWaste = (data: Movement[]) => Object.entries(data.reduce<Record<string,number>>((a,item) => {
  a[item.wasteType] = (a[item.wasteType] || 0) + item.quantity
  return a
},{})).map(([name,value]) => ({name,value:Number(value.toFixed(2))})).sort((a,b)=>b.value-a.value)

export const byTreatment = (data: Movement[]) => Object.entries(data.reduce<Record<string,number>>((a,item) => {
  a[item.treatment] = (a[item.treatment] || 0) + item.quantity
  return a
},{})).map(([name,value]) => ({name,value:Number(value.toFixed(2))})).sort((a,b)=>b.value-a.value)
