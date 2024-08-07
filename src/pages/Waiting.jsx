import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Inputfield from "../components/items/Inputfield";
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import { Avatar, Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import ButtonMD from "../components/items/ButtonMD";
import { useState } from "react";
import background from "../Assets/background.PNG";
import InputPasswordfield from "../components/items/InputPasswordfield";
import { Lock, LockTwoTone } from "@mui/icons-material";
import CardMD from "../components/items/CardMD";
import { NavLink, useNavigate } from "react-router-dom";
import url from "../url";
import endpoint, { url_FE } from "../Endpointurl";
import { useEffect } from "react";
import jackpot from "../Assets/jackpot.png";
import rectangle from "../Assets/rectangle.png";
import triangle from "../Assets/triangle.png";
import { io } from "socket.io-client";
import Sidebar from "../components/sidebar/Sidebar";

function Waiting({ selectedball }) {

    console.log("selectedball", selectedball);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [profiledetails, setProfiledetails] = useState('');
    const [balls, setBalls] = useState([]);
    const [game, setGame] = useState([]);
    const [selectedBall, setSelectedBall] = useState(parseInt(1));

    // schedule game

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

                if (response.data[0] == null || undefined) {
                    navigate(`${endpoint}dashboard`);
                }
                else if (response.data[0].game_status == "waiting") {
                    // navigate(`${endpoint}waiting`);

                    console.log(response.data[0]);
                    setGame(response.data[0]);
                    setStatus(response.data[0]);

                    const ballData = response.data[0].ball_counts_participants;
                    const formattedBalls = Object.keys(ballData).map((key, index) => ({
                        id: index + 1,
                        imageUrl: ballData[key].imageUrl,
                        count: ballData[key].count,
                    }));

                    setBalls(formattedBalls);

                } else if (response.data[0].game_status == "started") {
                    navigate(`${endpoint}gamestarted`);
                }
                else {
                    navigate(`${endpoint}pickball`);
                }


            }
            )
            .catch(error => {
                // setLoading(false);
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });


    }

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

    useEffect(() => {

        const selectedball = JSON.parse(localStorage.getItem('selectedBall'));
        if (selectedball) {
            setSelectedBall(parseInt(selectedball.id));
            setSelected(selectedball.imageUrl);
            console.log("selectedball", selectedball);
        }

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

        getScheduleGame(details);

    }, []);

    const rows = [1, 2, 3, 4, 5]; // Number of balls per row

    let ballIndex = 0;

    const disabledBalls = [8, 9];

    const [selected, setSelected] = useState("");

    const handleBallClick = (ball) => {
        if (!disabledBalls.includes(ball.id)) {
            setSelectedBall(ball.id);
            console.log(ball);
            setSelected(ball.imageUrl);
        }
    };

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
                        }}
                    >
                        {loader ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Grid container spacing={0}>

                                <Grid xs={12}>
                                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant='h6' color="#F5BC01" fontFamily="Pacifico" fontSize="57px" mt={1} mb={1}  >
                                                Waiting ...
                                            </Typography>

                                            <div>
                                                {selected?.length == 0 || selected == null || undefined ? <></>
                                                    :
                                                    <>
                                                        <TypographyMD variant='paragraph' label="You're ball is" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="25px" fontWeight={450} align="right" />
                                                        &nbsp;  <img src={selected} alt="..." style={{ width: "5vh", height: "5vh" }} />
                                                    </>
                                                }

                                            </div>

                                        </div>
                                    </Box>

                                </Grid>

                                <Grid xs={12} sm={12} md={5}>
                                    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}> */}

                                    <Stack ml={{ xs: 0, md: 15 }} mt={{ xs: 0, md: 5 }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Stack mt={3.5}>
                                                <Box sx={{ position: 'relative', ml: { xs: 5, md: 0 }, width: { xs: "80%", md: '100%' }, height: '70px', margin: 0, padding: 0 }} >
                                                    <Box
                                                        component="img"
                                                        src={rectangle}
                                                        alt="Rectangle"
                                                        sx={{ width: '100%', height: { xs: "80&", md: '100%' }, margin: 0, padding: 0 }} />
                                                    <Box
                                                        component="img"
                                                        src={jackpot}
                                                        alt="Jackpot Icon"
                                                        sx={{
                                                            position: 'absolute', top: { xs: "-25%", md: '-50%' }, left: '-10%', width: { xs: "10vh", md: '15vh' },
                                                            margin: 0, padding: 0
                                                        }} />
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            position: 'absolute', top: { xs: "30%", md: '50%' }, left: '25%', fontSize: { xs: "15px", md: "25px" }, fontFamily: "Rubik", fontWeight: 550,
                                                            transform: 'translateY(-50%)', color: '#000000', textAlign: 'left'
                                                        }}  >
                                                        Jackpot
                                                    </Typography>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            position: 'absolute', top: { xs: "30%", md: '50%' }, right: '5%', fontWeight: 550, fontSize: { xs: "15px", md: "25px" }, fontFamily: "Rubik",
                                                            transform: 'translateY(-50%)', color: '#000000', textAlign: 'right'
                                                        }}  >
                                                        {game?.jackpot == null || undefined ? "$0" : game?.jackpot}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </div>

                                        <Box sx={{ mt: { xs: 0, md: 5 }, p: 2, borderRadius: "10px", backgroundColor: "white", boxShadow: "none", border: "1px solid #F5BC01", width: { xs: "100%", md: "100%" } }}>

                                            {/* lg */}
                                            <Grid container spacing={0} sx={{ display: { xs: "none", md: "flex" } }}>
                                                <Grid xs={6} md={6}>
                                                    <Stack direction="column">
                                                        <TypographyMD variant='paragraph' label="Participants" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="20px" fontWeight={500} align="left" />

                                                        <TypographyMD variant='paragraph' label="Entry Fees" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="20px" fontWeight={500} align="left" />

                                                        <TypographyMD variant='paragraph' label="Game ID" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="20px" fontWeight={500} align="left" />
                                                    </Stack>
                                                </Grid>

                                                <Grid xs={6} md={6}>
                                                    <Stack direction="column">
                                                        <TypographyMD variant='paragraph' label={`${game?.total_participants == null || undefined ? 0 : game?.total_participants}`} color="#F5BC01" marginLeft={0} fontFamily="Rubik" fontSize="20px" fontWeight={500} align="right" />

                                                        <TypographyMD variant='paragraph' label={`${game?.entry_fee == null || undefined ? 0 : game?.entry_fee}`} color="#F5BC01" marginLeft={0} fontFamily="Rubik" fontSize="20px" fontWeight={500} align="right" />

                                                        <TypographyMD variant='paragraph' label={`${game?.game_id == null || undefined ? 0 : game?.game_id}`} color="#F5BC01" marginLeft={0} fontFamily="Rubik" fontSize="20px" fontWeight={500} align="right" />
                                                    </Stack>
                                                </Grid>
                                            </Grid>

                                            {/* xs */}
                                            <Grid container spacing={0} sx={{ display: { xs: "flex", md: "none" } }}>
                                                <Grid xs={6} md={6}>
                                                    <Stack direction="column">
                                                        <TypographyMD variant='paragraph' label="Participants" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="15px" fontWeight={500} align="left" />

                                                        <TypographyMD variant='paragraph' label="Entry Fees" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="15px" fontWeight={500} align="left" />

                                                        <TypographyMD variant='paragraph' label="Game ID" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="15px" fontWeight={500} align="left" />
                                                    </Stack>
                                                </Grid>

                                                <Grid xs={6} md={6}>
                                                    <Stack direction="column">

                                                        <TypographyMD variant='paragraph' label={`${game?.total_participants == null || undefined ? 0 : game?.total_participants}`} color="#F5BC01" marginLeft={0} fontFamily="Rubik" fontSize="15px" fontWeight={500} align="right" />

                                                        <TypographyMD variant='paragraph' label={`${game?.entry_fee == null || undefined ? 0 : game?.entry_fee}`} color="#F5BC01" marginLeft={0} fontFamily="Rubik" fontSize="15px" fontWeight={500} align="right" />

                                                        <TypographyMD variant='paragraph' label={`${game?.game_id == null || undefined ? 0 : game?.game_id}`} color="#F5BC01" marginLeft={0} fontFamily="Rubik" fontSize="15px" fontWeight={500} align="right" />

                                                    </Stack>
                                                </Grid>
                                            </Grid>

                                        </Box>
                                    </Stack>

                                    {/* </div> */}
                                </Grid>

                                <Grid xs={12} sm={12} md={7}>
                                    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '75vh' }}> */}

                                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                                        <Typography variant='h6' color="#F5BC01" align="center" fontFamily="Pacifico" fontSize="27px" mt={1} mb={1}  >
                                            Waiting ...
                                        </Typography>

                                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                            {selected?.length == 0 || selected == null || undefined ? <></>
                                                :
                                                <>
                                                    <TypographyMD variant='paragraph' label="You're ball is" color="#000000" marginLeft={0} fontFamily="Rubik" fontSize="25px" fontWeight={450} align="right" />
                                                    &nbsp;  <img src={selected} alt="..." style={{ width: "5vh", height: "5vh" }} />
                                                </>
                                            }
                                        </div>

                                    </Box>

                                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                        <Box
                                            sx={{
                                                backgroundImage: `url(${triangle})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: { xs: "contain", sm: "cover", md: "cover" },
                                                backgroundPosition: "center", // Positioning the background image
                                                width: { xs: "100%", sm: "55vh", md: "70%", lg: "70%" },
                                                height: { xs: "290px", sm: "330px", md: "485px" },
                                                display: "flex", // Flexbox properties to center the content
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box sx={{ width: "100%", ml: { xs: 2, md: 3 }, mt: { xs: -5, md: -9 } }}>
                                                {rows.map((numBalls, rowIndex) => (
                                                    <Grid
                                                        container
                                                        justifyContent="center"
                                                        spacing={1}
                                                        key={rowIndex}
                                                        sx={{ marginBottom: 1 }}
                                                    >
                                                        {Array.from({ length: numBalls }).map((_, colIndex) => {
                                                            if (ballIndex >= balls.length) return null;
                                                            const ball = balls[ballIndex++];
                                                            const isDisabled = disabledBalls.includes(ball.id);

                                                            return (
                                                                <Grid item key={colIndex} sx={{ position: "relative" }}  >
                                                                    <Avatar
                                                                        src={ball.imageUrl}
                                                                        alt={`Ball ${ball.id}`}
                                                                        sx={{
                                                                            width: { xs: 30, sm: 40, md: 60 },
                                                                            height: {
                                                                                xs: 28, sm: 35, md: 55

                                                                            },
                                                                            position: "relative",
                                                                            cursor: isDisabled ? "not-allowed" : "pointer",
                                                                            "&::after": isDisabled && {
                                                                                content: '""',
                                                                                position: "absolute",
                                                                                top: 0,
                                                                                left: 0,
                                                                                width: "100%",
                                                                                height: "100%",
                                                                                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
                                                                                borderRadius: "50%",
                                                                            },
                                                                            filter: isDisabled ? "grayscale(100%)" : "none", // Apply grayscale to make it appear disabled
                                                                            pointerEvents: isDisabled ? "none" : "auto", // Disable interaction
                                                                        }}
                                                                    />
                                                                    <Box
                                                                        sx={{
                                                                            position: "absolute",
                                                                            bottom: "85%",
                                                                            left: "40%",
                                                                            transform: "translateX(-50%)",
                                                                            // background: "rgba(0, 0, 0, 0.7)",
                                                                            color: "#fff",
                                                                            borderRadius: "4px",
                                                                            padding: "0 4px",
                                                                            fontSize: { xs: "10px", md: "20px" },
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    >
                                                                        {ball.count == 0 ? <></> : ball.count}
                                                                    </Box>

                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                ))}
                                            </Box>
                                        </Box>
                                    </div>

                                    {/* </div> */}
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                }
            />
            <ToastContainer />

        </>
    )
}

export default Waiting;