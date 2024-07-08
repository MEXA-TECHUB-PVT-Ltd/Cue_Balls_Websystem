import React from "react";
import egypt from '../../Assets/egypt.png'
import germany from '../../Assets/germany.png'
import southkorea from '../../Assets/southkorea.png'
import china from '../../Assets/china.png'
import map from '../../Assets/map.png'
import { Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import TypographyMD from "./Typography";

export const DashboardGoogleMap = () => {
    return (
        <>
            <Card sx={{
                boxShadow: "none", height: {xs:"auto",md:"460px"}, borderRadius: "12px", border: "1px solid rgba(0, 0, 0, 0.10)"
            }}>
                <CardContent>
                    <Grid container spacing={0}>
                        <Grid xs={12} md={8}>
                            <TypographyMD variant='h2' label="World Wide Users" color="#424242" fontFamily="Laila" marginLeft={0} fontSize="25px" fontWeight={550} align="left" />
                            <TypographyMD variant='h2' label="Last Research Report" color="#A5ADB0" fontFamily="Laila" marginLeft={0} fontSize="17px" fontWeight={500} align="left" />

                            <img src={map} alt="..." style={{ width: "400px", height: "310px" }} />

                        </Grid>
                        <Grid xs={12} md={4}>
                            <TypographyMD variant='h2' label="Countries" color="#424242" fontFamily="Laila" marginLeft={0} fontSize="25px" fontWeight={550} align="left" />
                            {renderCountryProgress("Egypt", 55, egypt)}
                            {renderCountryProgress("Germany", 70, germany)}
                            {renderCountryProgress("SouthKorea", 100, southkorea)}
                            {renderCountryProgress("China", 80, china)}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

const renderCountryProgress = (countryName, value, imageSrc) => (
    <>
        <Grid container spacing={0}>
            <Grid xs={6} md={6}>
                <Stack direction="row" spacing={1}>
                    <img src={imageSrc} alt={countryName} width="50" height="50" />
                    <div>
                        <TypographyMD variant='h2' label={countryName} color="#424242" fontFamily="Laila" marginTop={3} fontSize="17px" fontWeight={550} align="left" />
                    </div>
                </Stack>
            </Grid>

            <Grid xs={6} md={6}>
                <TypographyMD variant='h2' label={`${value}%`} color="#A5ADB0" fontFamily="Laila" marginTop={3} fontSize="17px" fontWeight={500} align="right" />
            </Grid>

            <Grid xs={12} md={12} pt={2} pb={2}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    style={{ borderRadius: '20px', backgroundColor: '#EDEDED' }}
                    sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#C4B1AB', borderRadius: '20px' } }}
                />
            </Grid>
        </Grid>

    </>
);