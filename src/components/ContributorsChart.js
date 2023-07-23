import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ContributorsChart = ({ data,choose }) => {
  // Function to parse the API response and convert it to Highcharts series format

  const getSeriesData = () => {
    if(choose==='c')
    {
        const contributorsData = data.map((item) => ({
            name: item.author.login,
            data: item.weeks.map((week) => [week.w * 1000, week.c]), // Convert timestamp to milliseconds
          }));
          return contributorsData;
    }
    else if(choose==='a')
    {
        const contributorsData = data.map((item) => ({
            name: item.author.login,
            data: item.weeks.map((week) => [week.w * 1000, week.a]), // Convert timestamp to milliseconds
          }));
          return contributorsData;
    }
    else
    {
        const contributorsData = data.map((item) => ({
            name: item.author.login,
            data: item.weeks.map((week) => [week.w * 1000, week.d]), // Convert timestamp to milliseconds
          }));
          return contributorsData;
    }
    
  };

  // Highcharts configuration
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Contributors\' Total Changes per Week',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Total Changes',
      },
    },
    tooltip: {
      formatter: function () {
        return (
          '<b>' +
          Highcharts.dateFormat('%A, %b %e, %Y', this.x) +
          '</b><br/>' +
          this.series.name +
          ': ' +
          this.y +
          ' changes'
        );
      },
    },
    legend: {
      enabled: true,
    },
    series: getSeriesData(), // Convert data to Highcharts series format
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ContributorsChart;
