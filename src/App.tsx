import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Movements from './pages/Movements'
import IssueDocument from './pages/IssueDocument'
import Indicators from './pages/Indicators'
import AppLayout from './components/AppLayout'

export default function App() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/app" element={<AppLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="movimentacoes" element={<Movements/>}/>
      <Route path="emitir" element={<IssueDocument/>}/>
      <Route path="indicadores" element={<Indicators/>}/>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
