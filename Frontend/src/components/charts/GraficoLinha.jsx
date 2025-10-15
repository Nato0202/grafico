import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./index.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoLinha() {
  const [agendamentosData, setAgendamentosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch('http://localhost:5001/agendamentos');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados dos agendamentos');
        }
        const data = await response.json();
        setAgendamentosData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Extrair labels (datas) e valores (agendamentos)
  const labels = agendamentosData.map((item) => new Date(item.data_agendamento).toLocaleDateString('pt-BR'));
  const valores = agendamentosData.map((item) => item.total_agendamentos);

  const data = {
    labels,
    datasets: [
      {
        label: "Total de Agendamentos",
        data: valores,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Agendamentos por Dia" },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Agendamentos: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: { ticks: { font: { size: 10 } } },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return value;
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
}
