import React from "react";
import TypographyMD from "./Typography";
import { TwoWheeler } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

function DashboardCard({ icon, heading, value }) {
    return (
        <>
            <Card sx={{
                width: "100%", height: { xs: "150px", md: "100px" }, backgroundColor: "transparent", borderRadius: "12px", border: "1px solid rgba(0, 0, 0, 0.10)", boxShadow: "none",
                cursor: "pointer",
                ":hover": {
                    backgroundColor: "#C4B1AB", //main box
                },
                ":hover .box": {
                    borderRadius: "10px",
                    backgroundColor: "white", //icon box
                    color: "#C4B1AB"
                },
                ".text1": {
                    color: "#A5ADB0"
                },
                ":hover .text1": {
                    color: "white"
                },
                ".text2": {
                    color: "#424242"
                },
                ":hover .text2": {
                    color: "white"
                },
            }}>
                <CardContent>
                    <Box align="left" >
                        <div style={{ display: "flex", justifyContent: "start", alignContent: "start", gap: "10px" }}>
                            <Box className="box" sx={{ width: "70px", height: "70px", borderRadius: "10px", backgroundColor: "rgba(196, 177, 171, 0.14)", color: "#C4B1AB" }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", height: "70px" }}>
                                    {icon}
                                </div>
                            </Box>

                            <Stack direction="column" spacing={0} pt={1}>
                                <Typography className="text1" variant="paragraph" align="left" sx={{ fontFamily: "Laila" }} fontWeight={550} fontSize="17px" >
                                    {heading}
                                </Typography>
                                <Typography className="text2" variant="paragraph" sx={{ fontFamily: "Laila" }} fontWeight={650} fontSize="25px" >
                                    {value}
                                </Typography>
                            </Stack>

                        </div>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default DashboardCard;