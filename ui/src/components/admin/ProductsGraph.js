import { useState, useEffect, useContext } from "react";
import React from "react";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Order from "./Order";
import axios from "axios";
import { Button } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "../../contexts/LoginContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

const ProductsGraph = (props) => {
  const [data, setData] = useState([]);
  const [graphType, setGraphType] = useState("bar"); // added state to keep track of the current graph type

  const fetchData = () => {
    axios
      .get("http://localhost:3001/orders/productStatistic")
      .then((response) => {
        console.log(response);
        if (response.data !== "") {
          let labels = [];
          let data = [];
          response.data.forEach((element) => {
            if (element._id !== null) {
              data.push({ name: element._id, total: element.total });
            }
          });

          setData(data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, {});

  // function to handle button click and change the graphType state
  const handleGraphTypeChange = () => {
    if (graphType === "bar") {
      setGraphType("pie");
    } else {
      setGraphType("bar");
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid container justifyItems="center">
        <Grid item xs={12} alignContent="center">
          <Button onClick={handleGraphTypeChange}>Change Graph</Button>
        </Grid>

        <Grid item xs={8}>
          {graphType === "bar" ? (
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          ) : (
            <PieChart width={600} height={300}>
              <Pie
                dataKey="total"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProductsGraph;
