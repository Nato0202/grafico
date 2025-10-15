import React, { useState } from 'react';
import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navBar/navBar.jsx';
import ChartDisplay from '../../components/charts/ChartDisplay.jsx';

import './index.scss'

function Barra() {
  const [dataType, setDataType] = useState('cursos');

  return (
    <>
      <div className="Home">
        <NavBar />

        <div className="main">
          <h1>Gráfico de Barras</h1>
          <div className="buttons">
            <button onClick={() => setDataType('cursos')} className={dataType === 'cursos' ? 'active' : ''}>Cursos</button>
            <button onClick={() => setDataType('agendamentos')} className={dataType === 'agendamentos' ? 'active' : ''}>Agendamentos</button>
          </div>
          <div className="graphic">
            <ChartDisplay dataType={dataType} chartType="bar" />
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default Barra;
