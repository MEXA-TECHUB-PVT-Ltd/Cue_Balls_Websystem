import { Box, Card, CardContent, Grid } from "@mui/material";
import React from "react";

function CardMD({ content }) {
    return (
        <>

            <Grid container spacing={0}>
                <Grid xs={12} align="center">

                    <Box p={3}>
                        <Card sx={{ backgroundColor: "transparent", boxShadow: "none", borderRadius: "20px", width: { xs: "100%", md: "40%", lg: "40%" } }} >
                            <CardContent>

                                <Grid container spacing={0} p={2}>
                                    <Grid xs={12} align="left">
                                        {content}
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Box>

                </Grid>
            </Grid>

        </>
    )
}

export default CardMD;