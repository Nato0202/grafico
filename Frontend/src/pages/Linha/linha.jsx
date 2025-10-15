import React, { useState } from 'react';
import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navBar/navBar.jsx';
import ChartDisplay from '../../components/charts/ChartDisplay.jsx';
import './index.scss'

function Linha() {
  const [dataType, setDataType] = useState('agendamentos');

  return (
    <>
      <div className="Home">
        <NavBar />

        <div className="main">
          <h1>Gráfico de Linha</h1>
          <div className="buttons">
            <button onClick={() => setDataType('cursos')} className={dataType === 'cursos' ? 'active' : ''}>Cursos</button>
            <button onClick={() => setDataType('agendamentos')} className={dataType === 'agendamentos' ? 'active' : ''}>Agendamentos</button>
          </div>
          <div className="graphic">
            <ChartDisplay dataType={dataType} chartType="line" />
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default Linha;
