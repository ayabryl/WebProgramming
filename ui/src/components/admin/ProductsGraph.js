import { useState, useEffect, useContext } from "react";
import React from "react";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Order from "./Order";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "../../contexts/LoginContext";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const ProductsGraph = (props) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const fetchData = () => {
    axios
      .get("http://localhost:3001/orders/productStatistic")
      .then((response) => {
        console.log(response);
        if (response.data !== "") {
          setChartData({
            labels: response.data.result.map((item) => item._id),
            datasets: [
              {
                label: "Product Name",
                data: response.data.map((item) => item.value),
                backgroundColor: "rgba(75,192,192,0.6)",
              },
            ],
          });
        }

        setChartOptions({
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, {});

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid>{/* <Bar data={chartData} options={chartOptions} /> */}</Grid>
    </React.Fragment>
  );
};

export default ProductsGraph;
