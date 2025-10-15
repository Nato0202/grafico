import { Link } from 'react-router-dom'
import './index.scss'

export default function NavBar() {
    return (
        <div className="navBar">
            <div className="img">
                <Link to="/"><img className='navBar-img' src="/image/logo-isnsf.png" alt="logo" /></Link>
            </div>
            <div className="title">
                <h1>Inscrições Instituto Social Nossa Senhora de Fátima 2026</h1>
            </div>
            <div className="options">
                <Link className='Link' to="/Grafico_Linha">Gráfico de Linha</Link>
                <Link className='Link' to="/Grafico_Barra">Gráfico de Barras</Link>
            </div>
        </div>
    )
}