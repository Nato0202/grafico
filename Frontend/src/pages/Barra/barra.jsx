import React from 'react';
import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navBar/navBar.jsx';
import GraficoBarras from '../../components/charts/GraficoBarras.jsx';

import './index.scss'

function Barra() {
  return (
    <>
      <div className="Home">
        <NavBar />
        
        <div className="main">
          <h1>Gráfico de Barra: </h1>
          <div className="graphic">
            <GraficoBarras />
          </div>
            
        </div>  

        <Footer />  
      </div>
    </>
  )
}

export default Barra;
