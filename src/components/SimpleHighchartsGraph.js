import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SimpleHighchartsGraph = ({ data }) => {
  console.log("namskar");
    function convertUnixTimestampToNormal(timestamp) {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
      
        // Return the formatted date as a string
        return `${year}-${month}-${day}`;
      }
      
  const options = {
    title: {
      text: 'Commits count',
    },
    xAxis: {
      categories: data.map((point) => convertUnixTimestampToNormal(point.week)), // Assuming your data has an 'x' property
    },
    yAxis: {
      title: {
        text: 'Number of commits',
      },
    },
    series: [
      {
        name: 'Commits',
        data: data.map((point) => point.total), // Assuming your data has a 'y' property
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SimpleHighchartsGraph;
