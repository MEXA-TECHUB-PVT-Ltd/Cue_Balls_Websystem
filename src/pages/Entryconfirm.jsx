import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Inputfield from "../components/items/Inputfield";
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import { Avatar, Box, Grid, Typography } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import ButtonMD from "../components/items/ButtonMD";
import { useState } from "react";
import mainBG from "../Assets/main_bg.png";
import InputPasswordfield from "../components/items/InputPasswordfield";
import { Lock, LockTwoTone } from "@mui/icons-material";
import CardMD from "../components/items/CardMD";
import { NavLink, useNavigate } from "react-router-dom";
import url from "../url";
import endpoint from "../Endpointurl";
import { useEffect } from "react";
import entry_gif from "../Assets/entry-gif.gif";
import Sidebar from "../components/sidebar/Sidebar";

function Entryconfirm() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`${endpoint}pickball`); // replace with your target route
        }, 5000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timer); // cleanup the timer
    }, [navigate]);

    return (
        <>
            <Sidebar
                componentData={
                    <Box
                        sx={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${entry_gif})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            width: "100%",
                            height: "100vh",
                        }}
                    >
                        <div style={{ display: "flex", alignContent: "center", alignItems: "center", height: "100vh" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                <Typography
                                    variant='h6'
                                    color="#F5BC01"
                                    fontFamily="Pacifico"
                                    fontSize="40px"
                                    sx={{
                                        width: { xs: "90%", md: '50%' },
                                        textAlign: 'center',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                        alignSelf: "center"
                                    }}
                                >
                                    your entry is confirmed. Time to choose your winning ball. 🚀🌟
                                </Typography>
                            </div>
                        </div>
                    </Box>
                }
            />

            <ToastContainer />
        </>
    )
}

export default Entryconfirm;