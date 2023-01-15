import { useState, useEffect, useContext } from "react";
import React from "react";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Order from "./Order";
import axios from "axios";

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
} from "recharts";

const ProductsGraph = (props) => {
  const [data, setData] = useState([]);

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

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#e3f2fd" />
      </BarChart>
    </React.Fragment>
  );
};

export default ProductsGraph;
