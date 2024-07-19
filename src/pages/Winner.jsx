import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import Topbar from "../components/topbar/Topbar";
import { ArrowBackIos, ArrowForwardIos, Block, Error as MuiError, FilterAlt, Search, Visibility } from "@mui/icons-material"
import jackpot from "../Assets/jackpot.png";
import winner_rectangle from "../Assets/winner_rectangle.png";
import ball6 from "../Assets/ball6.png";
import winnerBG from "../Assets/winnerBG.png";
import { useNavigate } from "react-router-dom";
import endpoint from "../Endpointurl";
import { io } from "socket.io-client";
import url from "../url";
import { ToastContainer, toast } from "react-toastify";
import confetti_gif from "../Assets/confetti-gif.gif";

function Winner() {

    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [profiledetails, setProfiledetails] = useState("");
    const [winningdetails, setWinningdetails] = useState([]);

    const getWinningDetails = (details) => {
        var InsertAPIURL = `${url}game/get_completed_games_latest_by_user_id?user_id=${details.data.user_id}`
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

                if (response.data.length == 0 || response.data == undefined || null) {
                    navigate(`${endpoint}dashboard`);
                } else {
                    console.log("winning user", response.data);
                    setWinningdetails(response.data);
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

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

        getWinningDetails(details);

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

    return (
        <>
            <Sidebar
                componentData={
                    <Box
                        sx={{
                            backgroundImage: `url(${winnerBG})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            width: "100%",
                            height: "100vh",
                        }}
                    >

                        {winningdetails.map((item) => (


                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Stack mt={3.5}>
                                        <Box sx={{ position: 'relative', ml: { xs: 5, md: 0 }, width: { xs: "80%", md: '100%' }, height: '70px', margin: 0, padding: 0 }} >
                                            <Box
                                                component="img"
                                                src={winner_rectangle}
                                                alt="Rectangle"
                                                sx={{ width: '100%', height: '100%', margin: 0, padding: 0 }} />
                                            <Box
                                                component="img"
                                                src={jackpot}
                                                alt="Jackpot Icon"
                                                sx={{
                                                    position: 'absolute', top: { xs: "-30%", md: '-45%' }, left: '-10%', width: '15vh',
                                                    margin: 0, padding: 0
                                                }} />
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    position: 'absolute', top: '50%', left: '25%', fontSize: "25px", fontFamily: "Rubik", fontWeight: 550,
                                                    transform: 'translateY(-50%)', color: '#FFE064', textAlign: 'left'
                                                }}  >
                                                Jackpot
                                            </Typography>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    position: 'absolute', top: '50%', right: '5%', fontWeight: 550, fontSize: "25px", fontFamily: "Rubik",
                                                    transform: 'translateY(-50%)', color: '#FFE064', textAlign: 'right'
                                                }}  >

                                                $  {item?.game_status == "House Wins" ? "0" :
                                                    <>
                                                        {item?.winning_amount}
                                                    </>
                                                }
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </div>

                                <div style={{ display: "flex" }}>
                                    <Typography variant="h5" sx={{ mt: 2, mb: 2, fontSize: "20px", fontFamily: "Rubik", fontWeight: 450, color: '#11D000' }}  >
                                        Your Ball
                                    </Typography> &nbsp;&nbsp;<Avatar src={item?.user_selected_ball_image_url} sx={{ mt: 1 }} />
                                </div>

                                {/* user_selected_winning_ball
                                winner_ball */}

                                <Typography variant="h5" sx={{
                                    mt: 0, fontSize: { xs: "15px", md: "37px" }, mb: 2, fontFamily: "Pacifico", fontWeight: "medium",
                                    textShadow: '2px 2px 0 #000',
                                    color: `${item?.game_status == "House Wins" ? "red"
                                        :
                                        item?.game_status == "Lost" ? "red"
                                            :
                                            "#11D000"
                                        }`
                                }}  >
                                    {/* item?.user_selected_ball == "1" || "2" || "3" || "4" || "5" || "6" || "7" && item?.winner_ball == "8" ?
                                        "Winner"
                                        :
                                        item?.user_selected_ball == "10" || "11" || "12" || "13" || "14" || "15" && item?.Winner_ball == "9" ?
                                            "winner"
                                            : */}
                                    {item?.game_status == "House Wins" ? "House Wins"
                                        :
                                        item?.game_status == "Lost" ? "Opps! you Lose"
                                            :
                                            "Winner"
                                    }

                                </Typography>

                                <Typography variant="h5" sx={{ mt: 0, fontSize: { xs: "15px", md: "20px" }, fontFamily: "Rubik", fontWeight: 450, color: '#000000' }}  >

                                    {item?.game_status == "House Wins" ? "Hard luck! Try again next time. 🎱🔄"
                                        :
                                        item?.game_status == "Lost" ? "Hard luck! Try again next time. 🎱🔄"
                                            :
                                            "Congratulations! Your ball won! 🏆💰"
                                    }

                                </Typography>

                                <Typography
                                    variant='h6'
                                    // color={`${item?.game_status == "House Wins" ? "red" : "#11D000"}`}
                                    color="#11D000"
                                    fontFamily="Pacifico"
                                    fontSize="37px"
                                    fontWeight="bold"
                                    style={{
                                        textShadow: '2px 2px 0 #000',
                                    }}
                                >
                                    Winner Ball

                                </Typography>

                                <Avatar src={item?.winner_ball_image_url} sx={{ width: { xs: 90, md: 150 }, height: { xs: 90, md: 150 } }} />

                                <Typography
                                    variant='h6'
                                    // color="#11D000"
                                    color={`${item?.game_status == "House Wins" ? "red" : "#11D000"}`}
                                    fontFamily="Pacifico"
                                    fontSize="30px"
                                >
                                    {item?.game_status == "House Wins" ? "House Wins" :
                                        <>
                                            Winners &nbsp;&nbsp; {item?.user_selected_winning_ball}
                                        </>
                                    }

                                </Typography>

                                <Typography
                                    variant='h6'
                                    color="#000000"
                                    fontFamily="Rubik"
                                    fontSize="20px"
                                    mb={2}
                                >

                                    Winning Amount &nbsp;&nbsp; {item.game_status == "House Win" ? 0 : item.game_status == "Lost" ? 0 : item?.winning_amount_single}
                                </Typography>

                                <Button onClick={() => navigate(`${endpoint}dashboard`)}
                                    variant="outlined"
                                    sx={{
                                        width: { xs: "60%", md: "20%" },
                                        color: '#060502',
                                        border: '4px solid #373737',
                                        textTransform: "capitalize",
                                        fontFamily: "Rubik",
                                        borderRadius: "10px",
                                        fontWeight: "bold",
                                        '&:hover': {
                                            background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',       // Change text color on hover
                                            border: '4px solid #373737',
                                        },
                                    }}
                                >
                                    Go to home
                                </Button>

                            </div>

                        ))}
                    </Box >
                }
            />
            <ToastContainer />
        </>
    )
}

export default Winner;