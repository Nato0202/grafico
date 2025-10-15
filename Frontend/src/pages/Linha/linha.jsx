import React from 'react';
import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navBar/navBar.jsx';
import GraficoLinha from '../../components/charts/GraficoLinha.jsx';
import './index.scss'

function Linha() {
  return (
    <>
      <div className="Home">
        <NavBar />
        
        <div className="main">
          <h1>Gráfico de Linha: </h1>
          <div className="graphic">
            <GraficoLinha />
          </div>
            
        </div>  

        <Footer />  
      </div>
    </>
  )
}

export default Linha;
