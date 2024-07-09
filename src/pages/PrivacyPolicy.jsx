import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Box, Divider, Grid, IconButton, Typography, InputAdornment, OutlinedInput, Stack, Card, CardContent, Container } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import Topbar from "../components/topbar/Topbar";
import { Search } from "@mui/icons-material"
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import url from "../url";
import { io } from "socket.io-client";
import endpoint from "../Endpointurl";
import * as sanitizeHtml from 'sanitize-html';

function PrivacyPolicy() {

    const navigate = useNavigate();

    useEffect(() => {

        getUserPrivacyPolicy();

    }, [])

    const [content, setContent] = useState("");

    const getUserPrivacyPolicy = () => {

        var InsertAPIURL = `${url}privacy_policy/get`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(InsertAPIURL, {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(response => {

                console.log(response.data);
                setContent(response.data);

            }
            )
            .catch(error => {
                // setLoading(false);
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });

    }

    const [status, setStatus] = useState("");

    useEffect(() => {
        // Initialize the socket connection
        const socket = io(url);

        // Define the message listener
        const messageListener = (msg) => {
            console.log("msg", msg);
            setStatus(msg);

            switch (msg.status) {
                case "created":
                    console.log("game-created"); // show triangle screen
                    navigate(`${endpoint}playgame`);
                    break;
                case "waiting":
                    console.log("game-status-change"); // show waiting screen ss in phone if status is waiting
                    navigate(`${endpoint}waiting`);
                    break;
                case "started":
                    console.log("game-started"); // if status is started then show animation
                    navigate(`${endpoint}gamestarted`);
                    break;
                case "result-anounced":
                    console.log("result-anounced");
                    navigate(`${endpoint}winner`);
                    break;
                case "restart":
                    console.log("game-restart"); // show restart game screen ss in phone
                    navigate(`${endpoint}restart`);
                    break;
                case "added-participants":
                    console.log("added-participants");
                    break;
                case "deleted":
                    console.log("game-deleted");
                    navigate(`${endpoint}dashboard`);
                    break;
                case "scheduled":
                    console.log("game-scheduled");
                    navigate(`${endpoint}playgame`);
                    break;
                default:
                    console.log("Unknown status");
            }

            console.log(":ddggfgf");
        };

        // Set up the socket event listener
        socket.on("received-data", messageListener);

        // Cleanup function to remove the message listener and disconnect socket
        return () => {
            socket.off("received-data", messageListener);
            socket.disconnect();
        };
    }, [status]);

    return (
        <>
            <Sidebar
                componentData={

                    <Box backgroundColor="white" height="100vh">
                        <Container>
                            <Grid container spacing={0}>

                                <Grid xs={12} md={12} sm={12} align="" p={2} >
                                    <TypographyMD variant='paragraph' label="Privacy Policy" color="#424242" marginLeft={0} fontFamily="Rubik" fontSize="30px" fontWeight={550} align="center" />
                                </Grid>

                            </Grid>

                            <Grid container spacing={0} sx={{ pl: 2, pr: 2 }} pt={0}>
                                <Typography variant="body1" fontFamily="Rubik">
                                    <div dangerouslySetInnerHTML={{ __html: content.content }} />
                                    {/* <div>{sanitizeHtml(content.content)}</div> */}
                                </Typography>
                            </Grid>
                        </Container>
                    </Box>

                }
            />

            <ToastContainer />

        </>
    )
}

export default PrivacyPolicy;