import { useEffect, useMemo, useState } from 'react'
import { ArrowDownToLine, ArrowRight, ArrowUpRight, FileDown, FilePlus2, Search, SlidersHorizontal, Truck, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDemo } from '../context/DemoContext'
import { downloadDocument, downloadMovementsCsv } from '../lib/document'
import { toDate, toTons } from '../lib/format'
import { EmptyState, PageIntro, StatusBadge } from '../components/UI'
import type { MovementStatus } from '../types'

const statusOptions: Array<MovementStatus | 'Todos os status'> = ['Todos os status','Em trânsito','Destinado','Pendente']

export default function Movements() {
  const {movements,updateStatus} = useDemo()
  const [search,setSearch] = useState('')
  const [filter,setFilter] = useState<MovementStatus | 'Todos os status'>('Todos os status')
  const [searchParams,setSearchParams] = useSearchParams()
  const [editingStatus,setEditingStatus] = useState<MovementStatus>('Em trânsito')
  const [flash,setFlash] = useState('')
  const selectedId = searchParams.get('selecionado')
  const selected = movements.find(item=>item.id===selectedId)
  const closeDetails = () => setSearchParams({}, {replace:true})
  useEffect(()=>{if(selected) setEditingStatus(selected.status)},[selected?.id, selected?.status])
  const list = useMemo(()=>movements.filter(item=>{
    const query = search.trim().toLocaleLowerCase('pt-BR')
    const matchesText = !query || [item.documentNumber,item.wasteType,item.destination,item.transporter,item.generator].some(value=>value.toLocaleLowerCase('pt-BR').includes(query))
    return matchesText && (filter === 'Todos os status' || item.status === filter)
  }).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),[movements,search,filter])
  const saveStatus = () => {
    if(!selected)return
    updateStatus(selected.id,editingStatus)
    setFlash('Situação atualizada. Os indicadores foram recalculados.')
    closeDetails()
  }
  return <>
    <PageIntro eyebrow="GESTÃO / MOVIMENTAÇÕES" title="Movimentações de resíduos" description="Consulte, filtre e acompanhe todas as operações cadastradas na demonstração." action={<Link to="/app/emitir" className="btn btn-dark"><FilePlus2 size={17}/> Nova emissão <ArrowRight size={17}/></Link>}/>
    <div className="info-strip"><Truck size={18}/><span><strong>{movements.length} movimentações</strong> registradas, incluindo dados fictícios iniciais e novas emissões feitas neste navegador.</span></div>
    {flash && <div className="success-message" role="status">{flash}<button type="button" onClick={()=>setFlash('')} aria-label="Dispensar mensagem"><X size={16}/></button></div>}
    <section className="panel movement-panel"><div className="movement-controls"><div className="search-field"><Search size={19}/><input aria-label="Buscar movimentação" placeholder="Buscar documento, resíduo ou empresa..." value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="filter-field"><SlidersHorizontal size={17}/><select aria-label="Filtrar situação" value={filter} onChange={e=>setFilter(e.target.value as MovementStatus|'Todos os status')}>{statusOptions.map(s=><option key={s} value={s}>{s}</option>)}</select></div><button className="btn btn-secondary btn-export" type="button" onClick={()=>downloadMovementsCsv(list)}><ArrowDownToLine size={17}/> Exportar CSV</button></div><div className="table-count">Exibindo {list.length} de {movements.length} registros</div><div className="table-scroll"><table className="data-table movement-table"><thead><tr><th>Identificação</th><th>Resíduo</th><th>Quantidade</th><th>Destinação</th><th>Data</th><th>Status</th><th>Ação</th></tr></thead><tbody>{list.map(m=><tr key={m.id}><td><div className="doc-cell"><span className="doc-symbol"><FileDown size={17}/></span><span><strong>{m.documentNumber}</strong><small>MTR demonstrativo</small></span></div></td><td className="td-waste">{m.wasteType}<small>{m.group}</small></td><td className="strong-cell">{toTons(m.quantity)}</td><td className="td-dest">{m.destination}</td><td>{toDate(m.createdAt)}</td><td><StatusBadge status={m.status}/></td><td><button type="button" onClick={()=>setSearchParams({selecionado:m.id})} className="table-action">Detalhes <ArrowUpRight size={16}/></button></td></tr>)}</tbody></table>{!list.length && <EmptyState/>}</div></section>
    <div className="bottom-hint"><span className="hint-icon">i</span> Selecione <strong>Detalhes</strong> para visualizar, baixar o comprovante ou alterar a situação de uma movimentação.</div>
    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)closeDetails()}}><div className="details-dialog" role="dialog" aria-modal="true" aria-label={`Movimentação ${selected.documentNumber}`}><header className="modal-header"><div><span className="eyebrow">DETALHES DA MOVIMENTAÇÃO</span><h2>{selected.documentNumber}</h2><p>Documento de demonstração • Sem validade legal</p></div><button type="button" className="icon-button" aria-label="Fechar detalhes" onClick={closeDetails}><X size={22}/></button></header><div className="details-body"><div className="details-highlight"><span>Volume transportado</span><strong>{toTons(selected.quantity)}</strong><StatusBadge status={selected.status}/></div><h3>Informações gerais</h3><div className="details-grid"><div><span>Data da movimentação</span><strong>{toDate(selected.createdAt)}</strong></div><div><span>Resíduo</span><strong>{selected.wasteType}</strong></div><div><span>Classificação</span><strong>{selected.group}</strong></div><div><span>Tratamento</span><strong>{selected.treatment}</strong></div><div><span>Gerador</span><strong>{selected.generator}</strong></div><div><span>Transportador</span><strong>{selected.transporter}</strong></div><div><span>Destinador</span><strong>{selected.destination}</strong></div><div><span>Motorista / veículo</span><strong>{selected.driver} • {selected.vehicle}</strong></div></div><div className="status-editor"><label htmlFor="edit-status">Atualizar situação demonstrativa</label><div><select id="edit-status" value={editingStatus} onChange={e=>setEditingStatus(e.target.value as MovementStatus)}><option>Em trânsito</option><option>Destinado</option><option>Pendente</option></select><button type="button" className="btn btn-dark" onClick={saveStatus}>Salvar situação</button></div></div></div><footer className="modal-footer"><button type="button" className="btn btn-secondary" onClick={()=>downloadDocument(selected)}><FileDown size={18}/> Baixar comprovante PDF</button><button type="button" className="btn btn-light" onClick={closeDetails}>Fechar</button></footer></div></div>}
  </>
}
