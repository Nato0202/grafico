import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./index.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartDisplay({ dataType, chartType }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = dataType === 'cursos' ? '/cursos' : '/agendamentos';
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados dos ${dataType}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  let labels, valores, title, label;

  if (dataType === 'cursos') {
    labels = data.map(item => `${item.course_name} (${item.period_name})`);
    valores = data.map(item => item.total_inscritos);
    title = "Inscritos por Curso e Período";
    label = "Total de Inscritos";
  } else {
    labels = data.map((item) => new Date(item.data_agendamento).toLocaleDateString('pt-BR'));
    valores = data.map((item) => item.total_agendamentos);
    title = "Agendamentos por Dia";
    label = "Total de Agendamentos";
  }

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data: valores,
        backgroundColor: chartType === 'bar' ? "rgba(54, 162, 235, 0.5)" : "rgba(75, 192, 192, 0.2)",
        borderColor: chartType === 'bar' ? "rgb(54, 162, 235)" : "rgb(75, 192, 192)",
        borderWidth: chartType === 'bar' ? 1 : undefined,
        tension: chartType === 'line' ? 0.3 : undefined,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${label}: ${context.parsed.y}`;
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
      {chartType === 'bar' ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />}
    </div>
  );
}
