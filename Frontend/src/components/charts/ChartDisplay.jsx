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
        // console.log('Data fetched from API:', result);
        setData(result);
      } catch (err) {
        console.error('Erro na API:', err);
        setError('Erro ao carregar dados da API');
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
    labels = data.map(item => item.courseName ? `${item.courseName} (${item.periodName})` : 'Dados inválidos');
    valores = data.map(item => item.totalInscritos || 0);
    title = "Inscritos por Curso e Período";
    label = "Total de Inscritos";
  } else {
    labels = data.map((item) => item.date || 'Dados inválidos');
    valores = data.map((item) => item.totalAgendamentos || 0);
    title = "Agendamentos por Dia";
    label = "Total de Agendamentos";
  }

  // Função pra definir cor com base no nome do curso
  const getCourseColor = (courseName) => {
    const name = courseName.toLowerCase();
  
    if (name.includes("administração")) return "rgba(255, 159, 64, 0.8)"; // laranja
    if (name.includes("informática")) return "rgba(54, 162, 235, 0.8)"; // azul
    if (name.includes("comunicação visual")) return "rgba(255, 20, 147, 0.8)"; // rosa choque
    if (name.includes("automação residencial")) return "rgba(90, 185, 100, 0.8)"
    if (name.includes("eletricista")) return "rgba(255, 206, 86, 0.8)"; // amarelo
    if (name.includes("eletromecânica") || name.includes("eletromecanica")) return "rgba(40, 40, 40, 0.9)"; // cinza muito escuro
    if (name.includes("inglês básico") || name.includes("ingles basico")) return "rgba(255, 0, 255, 0.8)"; // magenta
    if (name.includes("pré intermediário") || name.includes("pre intermediario")) return "rgba(153, 102, 255, 0.8)"; // roxo
    if (name.includes("avançado") || name.includes("intermediário")) return "rgba(75, 0, 130, 0.8)" // roxo mais escuro 
    if (name.includes("inglês teens ii")) return "rgba(139, 0, 0, 0.8)"; // vermelho mais escuro
    if (name.includes("inglês teens i")) return "rgba(255, 0, 0, 0.8)"; // vermelho

  
    return "rgba(201, 203, 207, 0.7)"; // fallback cinzinha
  };

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data: valores,
        backgroundColor:
          dataType === "cursos"
            ? data.map((item) => getCourseColor(item.courseName))
            : "rgba(75, 192, 192, 0.2)",
        borderColor:
          dataType === "cursos"
            ? data.map((item) => getCourseColor(item.courseName).replace("0.7", "1"))
            : "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", },
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
