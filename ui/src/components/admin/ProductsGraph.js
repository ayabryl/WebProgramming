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
  const [chartOptions, setChartOptions] = useState({
    scales: {
      xAxes: [
        {
          type: "category",
        },
      ],
      yAxes: [
        {
          type: "linear",
        },
      ],
    },
  });

  const [data, setData] = useState({
    labels: [], // an array of product names
    datasets: [
      {
        label: "Total Orders",
        data: [], // an array of total number of orders for each product
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const fetchData = () => {
    let chartData1 = [];
    let chartOptions1 = [];

    axios
      .get("http://localhost:3001/orders/productStatistic")
      .then((response) => {
        console.log(response);
        if (response.data !== "") {
          response.data.forEach((element) => {
            chartData1.push(element._id);
            chartOptions1.push(element.total);
          });

          setChartData(chartData);
        }

        setChartOptions(chartOptions);
      });

    setData({
      data: {
        labels: chartOptions1,
        datasets: [
          {
            label: "Total Orders",
            data: chartData1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, {});

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid> {/* <Bar data={data} chartOptions={chartOptions} /> */}</Grid>
    </React.Fragment>
  );
};

export default ProductsGraph;
