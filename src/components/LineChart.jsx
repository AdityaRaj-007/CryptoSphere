import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title as ChartTitle,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// ✅ Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  ChartTitle,
  Tooltip,
  Legend,
  CategoryScale
);

const { Title } = Typography;

function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    // Ensure timestamps are correctly converted
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }
  coinPrice.reverse();
  coinTimestamp.reverse();
  //const uniqueCoinTimeStamp = [...new Set(coinTimestamp)];

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        pointRadius: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: { type: "category", title: { display: true, text: "Date" } },
      y: {
        type: "linear",
        beginAtZero: true,
        title: { display: true, text: "Price in USD" },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
