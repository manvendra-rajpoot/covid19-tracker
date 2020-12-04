import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point:{
            radius: 0,
        },
    },  
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data){
                return numeral (tooltipItem.value).format('+0,0');
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    //including $ sign in ticks
                    callback: function (value, index, values) {
                        return numeral(value).format('0a');
                    },
                },
            },
        ],
    },
};

function LineGraph({caseType = 'cases', bg_col='#ff9999', border_col='#cc1034'}) {
    const [data, setData] = useState({});
    const buildChartData = (data, caseType = 'cases') => {
        let chartData = [];
        let lastDataPoint;

        for(let date in data.cases) {
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            };
            lastDataPoint = data[caseType][date];
        }
        return chartData;
    };

    //Data of last 100 days-> https://disease.sh/v3/covid-19/historical/all?lastdays=100
    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('DATA---> ',data);
                        const chartData = buildChartData(data, caseType); 
                        setData(chartData);
                    })
        };
        fetchData();
    },[caseType]);

    
    return (
        <div >
            {data && data.length >0 && (
                <Line 
                    options = {options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: bg_col,
                                borderColor: border_col,
                                data: data,
                            },
                        ]
                    }}
                />
            )}
        </div>

    )
}

export default LineGraph;
