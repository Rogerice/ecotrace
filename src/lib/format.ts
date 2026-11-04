export const toTons = (n: number) => `${n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} t`
export const toNumber = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
export const toDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Intl.DateTimeFormat('pt-BR').format(new Date(year, month - 1, day))
}
export const toPct = (n: number) => `${Math.round(n)}%`
