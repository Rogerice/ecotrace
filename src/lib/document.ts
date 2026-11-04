import { jsPDF } from 'jspdf'
import type { Movement } from '../types'
import { toDate, toTons } from './format'

export function downloadDocument(movement: Movement) {
  const pdf = new jsPDF({ unit:'mm', format:'a4' })
  pdf.setFillColor(9, 55, 37)
  pdf.rect(0,0,210,40,'F')
  pdf.setTextColor(255,255,255)
  pdf.setFont('helvetica','bold'); pdf.setFontSize(22); pdf.text('EcoTrace',18,19)
  pdf.setFont('helvetica','normal');pdf.setFontSize(10);pdf.text('Gestao inteligente de residuos',18,27)
  pdf.setTextColor(35,56,46);pdf.setFont('helvetica','bold');pdf.setFontSize(15)
  pdf.text('COMPROVANTE DEMONSTRATIVO',18,55)
  pdf.setFontSize(10);pdf.setTextColor(105,119,111)
  pdf.text('Documento ficticio - sem validade legal ou ambiental',18,62)
  pdf.setDrawColor(220,228,221);pdf.line(18,69,192,69)
  const rows: Array<[string,string]> = [
    ['Identificacao',movement.documentNumber],
    ['Data da movimentacao',toDate(movement.createdAt)],
    ['Status',movement.status],
    ['Gerador',movement.generator],
    ['Transportador',movement.transporter],
    ['Destinador',movement.destination],
    ['Motorista',movement.driver],
    ['Veiculo',movement.vehicle],
    ['Residuo',movement.wasteType],
    ['Classificacao',movement.group],
    ['Tratamento',movement.treatment],
    ['Quantidade',toTons(movement.quantity)],
    ['Nota fiscal',movement.invoice || 'Nao informada']
  ]
  let y = 79
  for(const [label,value] of rows){
    pdf.setFont('helvetica','normal');pdf.setTextColor(117,131,121);pdf.setFontSize(9);pdf.text(label,18,y)
    pdf.setFont('helvetica','bold');pdf.setTextColor(23,50,34);pdf.setFontSize(10)
    const lines = pdf.splitTextToSize(value,106) as string[]
    pdf.text(lines,86,y)
    y += Math.max(11,lines.length*5+5)
  }
  if(movement.observations){
    pdf.setFont('helvetica','normal');pdf.setFontSize(9);pdf.setTextColor(90,104,95)
    pdf.text('Observacoes:',18,y+2)
    pdf.text(pdf.splitTextToSize(movement.observations,170),18,y+9)
  }
  pdf.setTextColor(200,215,205);pdf.setFont('helvetica','bold');pdf.setFontSize(36)
  pdf.text('DEMONSTRACAO',106,244,{align:'center',angle:27})
  pdf.setDrawColor(220,228,221);pdf.line(18,278,192,278)
  pdf.setTextColor(120,130,125);pdf.setFontSize(8);pdf.setFont('helvetica','normal')
  pdf.text('EcoTrace | Prototipo academico | Dados integralmente ficticios',18,286)
  pdf.save(`${movement.documentNumber}-DEMONSTRACAO.pdf`)
}

export function downloadMovementsCsv(movements: Movement[]) {
  const cells = [
    ['Documento','Data','Residuo','Quantidade (t)','Status','Gerador','Transportador','Destinador','Tratamento'],
    ...movements.map(m=>[m.documentNumber,m.createdAt,m.wasteType,String(m.quantity).replace('.',','),m.status,m.generator,m.transporter,m.destination,m.treatment])
  ]
  const content = '\uFEFF'+cells.map(line=>line.map(value=>`"${String(value).replace(/"/g,'""')}"`).join(';')).join('\r\n')
  const url = URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}))
  const link = document.createElement('a')
  link.href=url;link.download='ecotrace-movimentacoes-demo.csv';document.body.appendChild(link);link.click();link.remove()
  setTimeout(()=>URL.revokeObjectURL(url),1000)
}
