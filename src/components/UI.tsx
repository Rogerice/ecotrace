import { ArrowUpRight, Leaf, type LucideIcon } from 'lucide-react'
import type { MovementStatus } from '../types'
import type { ReactNode } from 'react'

export function Brand({light = false, compact = false}: {light?: boolean, compact?: boolean}) {
  return <div className={`brand ${light ? 'brand--light' : ''}`} aria-label="EcoTrace">
    <span className="brand-icon"><Leaf size={21} strokeWidth={2.5}/></span>
    {!compact && <span className="brand-name">eco<span>trace</span><span className="brand-dot">.</span></span>}
  </div>
}

export function DemoBadge({dark=false}:{dark?:boolean}) {
  return <span className={`demo-badge ${dark?'demo-badge--dark':''}`}><span className="live-dot"/> Ambiente demonstrativo</span>
}

export function StatusBadge({status}:{status:MovementStatus}) {
  const variant = status === 'Destinado' ? 'status--done' : status === 'Em trânsito' ? 'status--transit' : 'status--pending'
  return <span className={`status-badge ${variant}`}><span className="status-circle"/>{status}</span>
}

export function PageIntro({eyebrow,title,description,action}:{eyebrow?:string,title:string,description:string,action?:ReactNode}) {
  return <div className="page-intro"><div><div className="eyebrow">{eyebrow || 'ÁREA DE GESTÃO'}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="page-intro__action">{action}</div>}</div>
}

export function MetricCard({label,value,note,icon:Icon,tone='green'}:{label:string,value:string,note:string,icon:LucideIcon,tone?:'green'|'blue'|'orange'|'purple'}) {
  return <div className="metric-card"><div className={`metric-card__icon icon-${tone}`}><Icon size={20} strokeWidth={2}/></div><p className="metric-card__label">{label}</p><div className="metric-card__value">{value}</div><div className="metric-card__note">{note}</div></div>
}

export function PanelHeader({title,sub,action}:{title:string,sub?:string,action?:ReactNode}) {
  return <div className="panel-header"><div><h3>{title}</h3>{sub && <p>{sub}</p>}</div>{action}</div>
}

export function EmptyState({title='Nenhum registro encontrado',description='Tente ajustar os filtros para visualizar resultados.'}:{title?:string,description?:string}) {
  return <div className="empty-state"><div className="empty-state__icon"><ArrowUpRight size={24}/></div><strong>{title}</strong><p>{description}</p></div>
}
