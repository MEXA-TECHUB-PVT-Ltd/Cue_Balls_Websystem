import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputfieldCom from "../components/items/InputfieldCom";
import { Avatar, Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import ButtonMD from "../components/items/ButtonMD";
import { useNavigate } from "react-router-dom";
import url from "../url";
import Sidebar from "../components/sidebar/Sidebar";
import background from "../Assets/background.PNG";
import { io } from "socket.io-client";
import endpoint from "../Endpointurl";
import alert from "../Assets/alert.png";
import ModalWarning from "../components/items/ModalWarning";

function Deleteaccount() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profiledetails, setProfiledetails] = useState("");

    useEffect(() => {

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

    }, []);

    const [opensuccess, setOpensuccess] = useState(false);

    const deleteaccount = () => {
        setLoading(true);
        setTimeout(() => {
            var InsertAPIURL = `${url}user/delete_user`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            var Data = {
                "email": profiledetails?.data?.email
            };
            fetch(InsertAPIURL, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(response => {
                    setLoading(false);
                    console.log(response)
                    if (response.error) {
                        setLoading(false);
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else { 
                        toast.success(response.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });

                        setTimeout(() => {
                            setLoading(false);
                            navigate(`${endpoint}`)
                        }, 2000) 

                    }
                }
                )
                .catch(error => {
                    setLoading(false);
                    toast.error(error, {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                });
        }, 2000)
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
                    <Box
                        sx={{
                            backgroundImage: `url(${background})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            width: "100%",
                            height: "100vh",
                            overflow: "hidden"
                        }}
                    >
                        <Container>
                            <Typography variant='h6' color="#F5BC01" align="center" fontFamily="Pacifico" fontSize={{ xs: "27px", sm: "37px", md: "57px" }} pt={4} mb={1}  >
                                Delete Account
                            </Typography>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
                                <Card sx={{ mt: { xs: 0, md: 0 }, p: 0, backgroundColor: "transparent", borderRadius: "10px", boxShadow: "none", border: "1px solid transparent", width: { xs: "90%", md: "50%" } }}>
                                    <CardContent>
                                        <Stack direction="column" spacing={1}>

                                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <img src={alert} style={{ width: 130 }} />
                                            </div>

                                            <Typography variant='body' color="#222222" align="center" fontFamily="Rubik" fontSize="13px"
                                            >
                                                By deleting your account, you will lose access to all your data associated with this account. However, you have the option to retrieve your data within 90 days of deletion by sending an email request to our administrative team at

                                                <br />

                                                <a href={`mailto:Cue-Ball@gmail.com`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                                    <span style={{ color: "#F5BC01" }}>Cue-Ball@gmail.com</span>
                                                </a>

                                            </Typography>

                                            <Typography variant='body' color="#222222" align="center" fontFamily="Rubik" fontSize="13px"
                                            >
                                                In the body of the email, provide the following complete profile credentials:
                                            </Typography>

                                            <Typography variant='body' color="#222222" align="left" fontFamily="Rubik" fontSize="13px"
                                            >
                                                <ul>
                                                    <li>Username</li>
                                                    <li>Email Address</li>
                                                    <li>Full Name</li>
                                                </ul>
                                            </Typography>

                                            <Typography variant='body' color="#222222" align="center" fontFamily="Rubik" fontSize="13px"
                                            >
                                                Please ensure that the provided information matches the details associated with your deleted account.
                                            </Typography>

                                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "30px" }}>
                                                <ButtonMD variant="contained" title="Delete Account" width="50%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClickTerm={() => setOpensuccess(true)} />
                                            </div>

                                        </Stack>
                                    </CardContent>
                                </Card>
                            </div>
                        </Container>
                    </Box>
                }
            />

            <ModalWarning
                open={opensuccess}
                onClose={() => setOpensuccess(false)}
                title="Are you sure to delete the account?"
                // subheading={`User ${userdetails.status == "unblock" ? "block" : "unblock"} Successfully`}
                data={
                    <ButtonMD variant="contained" title="Yes, sure" width="60%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClickTerm={deleteaccount} />
                }
            />

            <ToastContainer />
        </>
    );
}

export default Deleteaccount;
