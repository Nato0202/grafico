import React, { useState } from 'react';
import Footer from '../../components/footer/footer.jsx';
import NavBar from '../../components/navBar/navBar.jsx';
import ChartDisplay from '../../components/charts/ChartDisplay.jsx';
import './index.scss'

function Linha() {
  const [chartType, setChartType] = useState('line');

  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'bar' : 'line');
  };

  return (
    <>
      <div className="Home">
        <NavBar />

        <div className="main">
          <h1>Gráfico de {chartType === 'line' ? 'Linha' : 'Barras'} - Agendamentos</h1>
          <div className="buttons">
            <button onClick={toggleChartType} className="active">
              {chartType === 'line' ? 'Alterar para Barras' : 'Alterar para Linha'}
            </button>
          </div>
          <div className="graphic">
            <ChartDisplay dataType="agendamentos" chartType={chartType} />
          </div>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default Linha;
