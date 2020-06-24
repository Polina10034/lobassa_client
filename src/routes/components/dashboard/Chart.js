import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import Title from './Title';

export default function Chart(props) {
  const theme = useTheme();
  let chartData = [];

  Object.entries(props.data).map(item => {
    chartData.push({date: item[0], value: item[1]});
  });

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}