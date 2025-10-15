import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.scss'
import Linha from './pages/Linha/linha.jsx'
import Barra from './pages/Barra/barra.jsx'
import Home from './pages/Home/home.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Grafico_Linha" element={<Linha />} />
      <Route path="/Grafico_Barra" element={<Barra />} />
    </Routes>
  </BrowserRouter>
)
