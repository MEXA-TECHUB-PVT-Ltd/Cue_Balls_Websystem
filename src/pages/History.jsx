import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import Topbar from "../components/topbar/Topbar";
import { ArrowBackIos, ArrowForwardIos, Block, Error as MuiError, FilterAlt, Search, Visibility } from "@mui/icons-material"
import background from "../Assets/background.PNG";
import ButtonMD from "../components/items/ButtonMD";
import "./scrollbar.css"
import { ToastContainer, toast } from 'react-toastify';
import ModalAdd from "../components/items/Modal";
import Inputfield from "../components/items/Inputfield";
import { useFormik } from "formik";
import * as yup from 'yup';
import endpoint from "../Endpointurl";
import url from "../url";
import ball6 from "../Assets/ball6.png";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import balls from "../Assets/balls.png";
import moment from "moment";

function History() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [profiledetails, setProfiledetails] = useState("");
    const [history, setHistory] = useState([]);

    const getScheduleGame = (details) => {

        var InsertAPIURL = `${url}game/get_scheduled_games?user_id=${details?.data?.user_id}`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(InsertAPIURL, {
            method: 'GET',
            headers: headers,
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(response => {

                // if (response.data[0] == null || undefined) {
                //     navigate(`${endpoint}dashboard`);
                // } else if (response.data[0].game_status == "waiting") {
                //     navigate(`${endpoint}waiting`);
                // } else if (response.data[0].game_status == "started") {
                //     navigate(`${endpoint}gamestarted`);
                // } else {
                //     navigate(`${endpoint}pickball`)
                // }
            }
            )
            .catch(error => {
                // setLoading(false);
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });


    }

    const getGamehistory = (details) => {

        var InsertAPIURL = `${url}game/get_game_details_by_user_id?user_id=${details?.data?.user_id}`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        fetch(InsertAPIURL, {
            method: 'GET',
            headers: headers,
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(response => {

                console.log(response.data);
                setHistory(response.data.reverse());

                // if (response.data[0] == null || undefined) {
                //     navigate(`${endpoint}dashboard`);
                // } else if (response.data[0].game_status == "waiting") {
                //     navigate(`${endpoint}waiting`);
                // } else if (response.data[0].game_status == "started") {
                //     navigate(`${endpoint}gamestarted`);
                // } else {
                //     navigate(`${endpoint}pickball`)
                // }
            }
            )
            .catch(error => {
                // setLoading(false);
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });


    }

    // details
    const [historydetails, setHistorydetails] = useState("");
    const [openmodaldeposit, setOpenmodaldeposit] = useState(false);
    const HandleHistoryDetails = (data) => {
        setOpenmodaldeposit(true);
        console.log(data);
        setHistorydetails(data);
    }

    useEffect(() => {

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

        getScheduleGame(details);
        getGamehistory(details);

    }, []);


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

    function formatDate(timestamp) {
        // Parse the timestamp using Moment.js
        const dateObj = moment(timestamp);

        // Format the Date
        const formattedDate = dateObj.format('MMM DD, YYYY');

        // Format the Time
        const formattedTime = dateObj.format('hh:mma');

        // Combine date and time
        const formattedDateTime = `${formattedTime} - ${formattedDate}`;

        return formattedDateTime;
    }

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 2000); // 2 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <>
            <Sidebar
                componentData={
                    <Box
                        sx={{
                            backgroundImage: `url(${background})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            width: "100%",
                            height: "100vh",
                            overflow: "hidden",

                        }}
                    >
                        {loader ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Box pb={50} pl={{ xs: 5, md: 20 }} pr={{ xs: 5, md: 20 }}>
                                {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}> */}
                                <Typography variant='h6' align="center" color="#F5BC01" fontFamily="Pacifico" fontSize={{ xs: "27px", md: "50px" }} mt={1}   >
                                    History
                                </Typography>

                                {history?.length == 0 || history == null || undefined ?
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>

                                        <img src={balls} alt="Balls" style={{ width: "50vh", marginBottom: '20px' }} />

                                        <Typography
                                            variant='h6'
                                            color="#F5BC01"
                                            fontFamily="Pacifico"
                                            fontSize="30px"
                                            sx={{
                                                width: { xs: "90%", md: '50%' },
                                                textAlign: 'center',
                                                whiteSpace: 'normal',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            No history yet. 🎱 Prepare for legendary & unforgettable victories! 🌟
                                        </Typography>
                                    </div>
                                    :
                                    <>

                                        <Box mt={2} backgroundColor=" "

                                            sx={{
                                                height: { xs: "450px", sm: "600px", md: '500px', lg: "950px" }, // Set a specific height for the stack
                                                overflowY: 'auto', // Enable vertical scrolling
                                                scrollbarWidth: 'thin', // Firefox
                                                scrollbarColor: 'transparent transparent', // For Firefox
                                                '&::-webkit-scrollbar': {
                                                    width: '8px', // Width of the scrollbar
                                                    backgroundColor: 'transparent', // Make the scrollbar itself transparent
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    backgroundColor: 'transparent', // Make the scrollbar thumb transparent
                                                    borderRadius: '10px',
                                                },
                                                '&::-webkit-scrollbar-track': {
                                                    backgroundColor: 'transparent', // Make the scrollbar track transparent
                                                },
                                            }}

                                        >

                                            {history.map((item) => (
                                                <Card sx={{ mt: { xs: 2, md: 2 }, p: 0, borderRadius: "10px", boxShadow: "none", border: "1px solid #F5BC01", width: { xs: "100%", md: "100%" }, cursor: "pointer" }} onClick={() => HandleHistoryDetails(item)}>
                                                    <CardContent>

                                                        <Grid container spacing={0}>
                                                            <Grid xs={3} md={3} pt={{ xs: 2, md: 0 }}>
                                                                <Avatar src={item?.winner_ball_image_url} alt="..." sx={{ width: { xs: 50, md: 100 }, height: { xs: 50, md: 100 } }} />
                                                            </Grid>

                                                            <Grid xs={9} md={9} align="right" pt={1}>
                                                                <Grid container xs={12} md={9} justifyContent="flex-end">
                                                                    <Grid item xs={7} md={7}>
                                                                        <Stack direction="column">
                                                                            <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 20 }}>
                                                                                Game ID
                                                                            </Typography>
                                                                            <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 20 }}>
                                                                                Game Status
                                                                            </Typography>
                                                                            <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 20 }}>
                                                                                Entry Fees
                                                                            </Typography>

                                                                        </Stack>
                                                                    </Grid>

                                                                    <Grid item xs={5} md={5} align="left">
                                                                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right" }}>


                                                                            <Stack direction="column">
                                                                                <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 20 }}>
                                                                                    # {item?.game_id}
                                                                                </Typography>
                                                                                <Typography variant='body' align="left"
                                                                                    color={`${item?.game_status == "House Wins" ? "red" : item?.game_status == "Lost" ? "red" : "#11D000"}`}
                                                                                    fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 20 }}>
                                                                                    {item?.game_status}
                                                                                </Typography>
                                                                                <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 20 }}>
                                                                                    {item?.entry_fee}
                                                                                </Typography>

                                                                            </Stack>

                                                                        </div>
                                                                    </Grid>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>

                                                    </CardContent>
                                                </Card>
                                            ))}

                                        </Box>

                                    </>
                                }

                            </Box>
                        )}
                    </Box >
                }
            />

            <ModalAdd
                open={openmodaldeposit}
                onClose={() => setOpenmodaldeposit(false)}
                title="History Details"
                data={
                    <>

                        <div>
                            <div style={{ paddingBottom: 30, paddingLeft: 30, paddingRight: 30 }}>


                                <Grid container spacing={0}>
                                    <Grid xs={12} md={12} align="center" >
                                        <Avatar src={historydetails?.winner_ball_image_url} alt="..." sx={{ selfAlign: "center", width: { xs: 50, md: 100 }, height: { xs: 50, md: 100 } }} />
                                    </Grid>

                                    <Grid xs={12} md={12} align="right" pt={1}>
                                        <Grid container xs={12} md={12}  >
                                            <Grid item xs={6} md={7}>
                                                <Stack direction="column">
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Game ID
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Game Status
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Entry Fees
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Commision
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Total Participants
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        You're Ball
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Date
                                                    </Typography>
                                                    <Typography variant='body' align="left" color="gray" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                        Winning Amount
                                                    </Typography>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={6} md={5} align="center">
                                                <div style={{ display: "flex", justifyContent: "start", alignContent: "start" }}>


                                                    <Stack direction="column">
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {historydetails?.game_id}
                                                        </Typography>
                                                        <Typography variant='body' align="left"
                                                            color={`${historydetails?.game_status == "House Wins" ? "red" : historydetails?.game_status == "Lost" ? "red" : "#11D000"}`}
                                                            fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {historydetails?.game_status}
                                                        </Typography>
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {historydetails?.entry_fee}
                                                        </Typography>
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {historydetails?.commission}  %
                                                        </Typography>
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {historydetails?.total_participants}
                                                        </Typography>
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {historydetails?.user_selected_winning_ball}
                                                        </Typography>
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            {formatDate(historydetails?.played_at)}
                                                        </Typography>
                                                        <Typography variant='body' align="left" color="#F5BC01" fontFamily="Rubik" fontWeight={450} fontSize={{ xs: 13, md: 16 }}>
                                                            $ {historydetails?.winning_amount}
                                                        </Typography>
                                                    </Stack>

                                                </div>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </div>
                        </div>

                    </>
                }
            />

            <ToastContainer />
        </>
    )
}

export default History;