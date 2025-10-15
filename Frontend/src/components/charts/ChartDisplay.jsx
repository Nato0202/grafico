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
        const endpoint = dataType === 'cursos' ? 'https://api.vestibular-insf.com.br/api/enrollments/count-by-course-period?password=r%26p0rts' : 'https://api.vestibular-insf.com.br/api/appointments/count-by-date?password=r%26p0rts';
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados dos ${dataType}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Erro na API, usando dados locais:', err);
        // Fallback para dados locais
        const localEndpoint = dataType === 'cursos' ? '/data/cursos.json' : '/data/agendamentos.json';
        try {
          const localResponse = await fetch(localEndpoint);
          if (localResponse.ok) {
            const localResult = await localResponse.json();
            setData(localResult);
          } else {
            setError('Erro ao carregar dados locais');
          }
        } catch {
          setError('Erro ao carregar dados');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  if (!data || data.length === 0) return <div>Nenhum dado disponível</div>;

  let labels, valores, title, label;

  if (dataType === 'cursos') {
    labels = data.map(item => item._id && item._id.courseName ? `${item._id.courseName} (${item._id.periodName})` : 'Dados inválidos');
    valores = data.map(item => item.totalInscritos || 0);
    title = "Inscritos por Curso e Período";
    label = "Total de Inscritos";
  } else {
    labels = data.map((item) => item._id || 'Dados inválidos');
    valores = data.map((item) => item.totalAgendamentos || 0);
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
    maintainAspectRatio: false,
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
      x: {
        ticks: {
          font: { size: 10 },
          maxRotation: 90,
          minRotation: 90
        }
      },
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
