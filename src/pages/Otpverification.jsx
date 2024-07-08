import React, { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPInput from "otp-input-react";
import logo from "../Assets/logo.png";
import mainBG from "../Assets/main_bg.png";
import { useState } from "react";
import CardMD from "../components/items/CardMD";
import TypographyMD from "../components/items/Typography";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import ButtonMD from "../components/items/ButtonMD";
import url from "../url";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import endpoint from "../Endpointurl";
import { KeyboardArrowLeft } from "@mui/icons-material";
import "../styles/global.css";

function OtpVerification() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [profiledetails, setProfiledetails] = useState('');

    useEffect(() => {
        const details = localStorage.getItem('useremail');
        if (details) {
            console.log(details);
            setProfiledetails(details);
        }
    }, [])

    const [isFocused, setIsFocused] = useState(false);
    const [enteredotp, setEnteredotp] = useState('');
    const [otpemptyfieldalert, setOtpemptyfieldalert] = useState(false);

    const verify = async () => {
        // console.log(enteredotp); 

        setLoading(true);
        setTimeout(() => {
            var InsertAPIURL = `${url}user/verification_otp`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            var Data = {
                "email": profiledetails,
                "otp": enteredotp
            };
            fetch(InsertAPIURL, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    setLoading(false);
                    console.log(response)
                    if (response.error) {
                        setLoading(false);
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        setEnteredotp("");
                    } else {
                        navigate(`${endpoint}setpassword`);
                        setLoading(false);
                        setEnteredotp("");
                    }
                }
                )
                .catch(error => {
                    setLoading(false);
                    toast.error(error, {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                });
        }, 1000)

    }

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${mainBG})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100vh",
                }}
            >
                <div style={{ display: "flex", alignContent: "center", alignItems: "center", height: "95vh" }}>
                    <CardMD
                        content={
                            <>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", paddingBottom: 0 }}>
                                    <TypographyMD variant='paragraph' label="Verification" color="white" marginLeft={0} fontFamily="Rubik" fontSize="33px" fontWeight={450} align="center" />
                                </div>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", paddingBottom: 20 }}>
                                    <TypographyMD variant='paragraph' label="We've sent a verification code to the email address associated with your account." color="white" marginLeft={0} fontFamily="Rubik" fontSize="16px" fontWeight={400} align="center" />
                                </div>

                                <div>
                                    <div style={{ marginBottom: '30px' }}>
                                        <Grid container spacing={0}
                                            sx={{ display: "flex", justifyContent: "center", alignContent: "center", }}>
                                            <Grid xs={12} align="center" pt={2}>

                                                <Stack align="center" direction="column" spacing={1}>
                                                    <OTPInput
                                                        value={enteredotp}
                                                        onChange={(e) => { setEnteredotp(e) }}
                                                        OTPLength={6}
                                                        otpType=""
                                                        disabled={false}
                                                        inputStyles={{
                                                            width: "17%",
                                                            height: "10vh",
                                                            border: "3px solid #A4A4A4",
                                                            backgroundColor: "#353535",
                                                            color: "#A4A4A4",
                                                            borderRadius: "5px",
                                                            fontWeight: "450"
                                                        }}
                                                        onFocus={() => setIsFocused(true)}
                                                        onBlur={() => setIsFocused(false)}
                                                    />

                                                    <Box align="left" sx={{ height: "10px" }}>
                                                        {
                                                            otpemptyfieldalert ?
                                                                <TypographyMD variant='paragraph' label="OTP is required" color="red" marginLeft={3} fontSize="14px" fontWeight={550} align="left" />
                                                                :
                                                                <></>
                                                        }
                                                    </Box>

                                                </Stack>

                                            </Grid>
                                        </Grid>
                                    </div>

                                    <Box >
                                        <ButtonMD variant="contained" title="Verify" width="100%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClickTerm={verify} />
                                    </Box>

                                    <Box align="center" pt={3}  >
                                        <div style={{ width: "fit-content", cursor: "pointer" }} onClick={() => navigate(`${endpoint}emailverification`)} >
                                            <KeyboardArrowLeft sx={{ color: "#FFE064" }} /> <TypographyMD variant=' ' label="Back" color="#FFE064" fontFamily="Rubik" marginLeft={0} fontSize="15px" fontWeight={450} align="" />
                                        </div>
                                    </Box>

                                </div>
                            </>
                        }
                    />
                </div>
            </Box>

            <ToastContainer />
        </>
    )
}

export default OtpVerification;