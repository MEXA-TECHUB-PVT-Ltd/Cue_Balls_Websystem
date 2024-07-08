import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import TypographyMD from "./Typography";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

function DashboardAreaChart() {
    const [series, setSeries] = React.useState([{
        name: "Downloads",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]);

    const [options, setOptions] = React.useState({
        chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            colors: ['#C4B1AB']
        },
        fill: {
            opacity: 0.9,
            colors: ['#C4B1AB']
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });
    return (
        <>
            <Card sx={{
                boxShadow: "none", height: {xs:"auto",md:"460px"}, borderRadius: "12px", border: "1px solid rgba(0, 0, 0, 0.10)"
            }}>
                <CardContent>
                    <Grid container spacing={0}>
                        <Grid xs={12} md={8}>
                            <TypographyMD variant='h2' label="App Statistic" color="#424242" fontFamily="Laila" marginLeft={0} fontSize="25px" fontWeight={550} align="left" />
                            <TypographyMD variant='h2' label="Last Research Report" color="#A5ADB0" fontFamily="Laila" marginLeft={0} fontSize="17px" fontWeight={500} align="left" />
                        </Grid>

                        <Grid xs={12}>
                            <div id="chart" className=' bg-white'>
                                <ReactApexChart options={options} series={series} type="area" height={350} />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default DashboardAreaChart;