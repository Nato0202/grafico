import React from 'react';
import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navBar/navBar.jsx';
import ChartDisplay from '../../components/charts/ChartDisplay.jsx';

import './index.scss'

function Barra() {
  return (
    <>
      <div className="Home">
        <NavBar />

        <div className="main">
          <h1>Gráfico de Cursos</h1>
          <div className="graphic">
            <ChartDisplay dataType="cursos" chartType="bar" />
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default Barra;
