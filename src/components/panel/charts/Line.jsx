import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'January', total_income: 4000 },
  { name: 'February', total_income: 3000 },
  { name: 'March', total_income: 2000 },
  { name: 'April' },
  { name: 'May', total_income: 1890 },
  { name: 'June', total_income: 2390 },
  { name: 'July', total_income: 3490 },
  { name: 'August', total_income: 3490 },
  { name: 'September', total_income: 3490 },
  { name: 'October', total_income: 3490 },
  { name: 'November', total_income: 3490 },
  { name: 'December', total_income: 3490 },
];

const LineChartComponent = ({ height }) => {
  height = height ?? 200;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total_income" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

LineChartComponent.propTypes = {
  height: PropTypes.number,
};

export default LineChartComponent;
