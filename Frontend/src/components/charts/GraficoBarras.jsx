import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./index.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoBarras() {
  const [cursosData, setCursosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('http://localhost:5001/cursos');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados dos cursos');
        }
        const data = await response.json();
        setCursosData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  const labels = cursosData.map(item => `${item.course_name} (${item.period_name})`);
  const valores = cursosData.map(item => item.total_inscritos);

  const data = {
    labels,
    datasets: [
      {
        label: "Total de Inscritos",
        data: valores,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Inscritos por Curso e Período" },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Inscritos: ${context.parsed.y}`;
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
      <Bar data={data} options={options} />
    </div>
  );
}
