import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ChartNoAxesCombined, ChevronRight, FilePlus2, LayoutGrid, Leaf, Menu, RotateCcw, Truck, X } from 'lucide-react'
import { useDemo } from '../context/DemoContext'
import { Brand, DemoBadge } from './UI'

const links = [
  { to:'/app', label:'Visão geral',icon:LayoutGrid,end:true },
  { to:'/app/movimentacoes', label:'Movimentações',icon:Truck },
  { to:'/app/emitir', label:'Emitir documento',icon:FilePlus2 },
  { to:'/app/indicadores', label:'Indicadores',icon:ChartNoAxesCombined }
]

export default function AppLayout() {
  const [open,setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const {resetDemo} = useDemo()
  const active = links.find(item=> item.end ? location.pathname === item.to : location.pathname.startsWith(item.to))
  const handleReset = () => {
    if (window.confirm('Restaurar todos os dados fictícios da demonstração? Suas alterações neste navegador serão apagadas.')) {
      resetDemo()
      navigate('/app')
      setOpen(false)
    }
  }
  return <div className="app-frame">
    {open && <div className="sidebar-overlay" onClick={()=>setOpen(false)}/>}
    <aside className={`sidebar ${open?'sidebar--open':''}`}>
      <div className="sidebar-brand"><Brand/><button type="button" className="mobile-close" onClick={()=>setOpen(false)} aria-label="Fechar menu"><X size={21}/></button></div>
      <div className="sidebar-workspace"><span className="workspace-symbol"><Leaf size={17}/></span><span><strong>EcoTrace Demo</strong><small>Empresa demonstrativa</small></span><ChevronRight size={16}/></div>
      <div className="sidebar-section-title">MENU PRINCIPAL</div>
      <nav className="sidebar-nav" aria-label="Navegação principal">
        {links.map(item=><NavLink to={item.to} key={item.to} end={item.end} onClick={()=>setOpen(false)} className={({isActive})=>`sidebar-link ${isActive?'active':''}`}><item.icon size={19}/><span>{item.label}</span></NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-info"><div className="sidebar-info__icon"><Leaf size={18}/></div><strong>Projeto EcoTrace</strong><p>Explore todas as etapas da gestão ambiental em uma simulação interativa.</p><span>100% dados fictícios <ArrowUpRight size={13}/></span></div>
        <button type="button" onClick={handleReset} className="sidebar-reset"><RotateCcw size={16}/> Restaurar demonstração</button>
        <a href="/" className="sidebar-back"><ArrowLeft size={16}/> Voltar ao site</a>
      </div>
    </aside>
    <div className="app-content">
      <header className="app-topbar">
        <div className="topbar-left"><button className="mobile-menu" type="button" onClick={()=>setOpen(true)} aria-label="Abrir menu"><Menu size={21}/></button><span className="topbar-crumb">EcoTrace</span><ChevronRight size={14}/><span className="topbar-current">{active?.label || 'Visão geral'}</span></div>
        <div className="topbar-right"><DemoBadge/><div className="topbar-divider"/><span className="avatar" title="Usuário de demonstração">EC</span></div>
      </header>
      <div className="app-main"><Outlet/></div>
      <footer className="app-footer"><span>© 2026 EcoTrace • Projeto demonstrativo</span><span><span className="footer-dot"/> Nenhuma informação real é utilizada</span></footer>
    </div>
  </div>
}
