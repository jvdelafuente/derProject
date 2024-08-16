import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getToken } from "../utils/getToken";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import '../pages/AboutUs.css'

// Registrar los elementos necesarios para los gráficos de líneas
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, TimeScale);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/analytics/event_counts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });
        const data = await response.json();
        console.log('Response data:', data);

        // Verifica que los datos están en el formato esperado
        if (Array.isArray(data.signUpData) && Array.isArray(data.noteCreatedData)) {
          // Convierte las fechas en formato adecuado para Chart.js
          const signUpDates = data.signUpData.map(item => new Date(item.date));
          const signUpCounts = data.signUpData.map(item => item.count);
          const noteCreatedDates = data.noteCreatedData.map(item => new Date(item.date));
          const noteCreatedCounts = data.noteCreatedData.map(item => item.count);

          setChartData({
            signUpData: {
              labels: signUpDates,
              datasets: [
                {
                  label: 'Users Signed Up',
                  data: signUpCounts,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                  fill: false,
                },
              ],
            },
            noteCreatedData: {
              labels: noteCreatedDates,
              datasets: [
                {
                  label: 'Notes Created',
                  data: noteCreatedCounts,
                  backgroundColor: 'rgba(153, 102, 255, 0.6)',
                  borderColor: 'rgba(153, 102, 255, 1)',
                  borderWidth: 1,
                  fill: false,
                },
              ],
            },
          });
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className='charts-container'>
      {chartData ? (
        <div>
          <div>
            <h2>Users Signed Up Over Time</h2>
            <Line
              data={chartData.signUpData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                    type: 'time',
                    time: {
                      unit: 'day',
                      tooltipFormat: 'dd MMM yyyy',  // Formato de fecha compatible
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count',
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          <div>
            <h2>Posts Created Over Time</h2>
            <Line
              data={chartData.noteCreatedData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                    type: 'time',
                    time: {
                      unit: 'day',
                      tooltipFormat: 'dd MMM yyyy',  // Formato de fecha compatible
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count',
                    },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default ChartComponent;
