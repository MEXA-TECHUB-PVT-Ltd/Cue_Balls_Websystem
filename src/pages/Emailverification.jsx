import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useState } from "react";
import CardMD from "../components/items/CardMD";
import { Avatar, Box } from "@mui/material";
import logo from "../Assets/logo.png";
import mainBG from "../Assets/main_bg.png";
import TypographyMD from "../components/items/Typography";
import Inputfield from "../components/items/Inputfield";
import ButtonMD from "../components/items/ButtonMD";
import { KeyboardArrowLeft, MailOutlineTwoTone } from "@mui/icons-material";
import url from "../url";
import { useNavigate } from "react-router-dom";
import endpoint from "../Endpointurl";

function Emailverification() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        email: yup
            .string()
            .email("Invalid email")
            .required('Required Email'),
    });
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);

            setLoading(true);
            setTimeout(() => {
                var InsertAPIURL = `${url}user/forget_password_email`
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                var Data = {
                    "email": values.email
                };
                fetch(InsertAPIURL, {
                    method: 'POST',
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
                        } else {
                            navigate(`${endpoint}otpverification`);
                            localStorage.setItem("useremail", values.email);
                            setLoading(false);
                            formik.resetForm();
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

        },
    });
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
                                    <TypographyMD variant='paragraph' label="Forget Password" color="white" marginLeft={0} fontFamily="Rubik" fontSize="33px" fontWeight={450} align="center" />
                                </div>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", paddingBottom: 20 }}>
                                    <TypographyMD variant='paragraph' label="Please enter the email address associated with your account below." color="white" marginLeft={0} fontFamily="Rubik" fontSize="16px" fontWeight={400} align="center" />
                                </div>

                                <form onSubmit={formik.handleSubmit} >
                                    <div>
                                        <div style={{ marginBottom: '20px' }}>

                                            <Inputfield
                                                autoFocus={false}
                                                value={formik.values.email}
                                                onChngeterm={(e) => formik.setFieldValue("email", e.target.value)}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                // icon={<MailOutlineTwoToneIcon sx={{ color: "#B6BEA9" }} />}
                                                type="text"
                                                variant="outlined"
                                                label=""
                                                placeholder="Email Address"
                                            />
                                        </div>

                                        <ButtonMD variant="contained" title="Send Code" width="100%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} />

                                        <Box align="center" pt={3}  >
                                            <div style={{ width: "fit-content", cursor: "pointer" }} onClick={() => navigate(`${endpoint}`)} >
                                                <KeyboardArrowLeft sx={{ color: "#FFE064" }} /> <TypographyMD variant=' ' label="Back to login" color="#FFE064" fontFamily="Rubik" marginLeft={0} fontSize="15px" fontWeight={450} align="" />
                                            </div>
                                        </Box>

                                    </div>
                                </form>
                            </>
                        } />
                </div>
            </Box>

            <ToastContainer />
        </>
    )
}

export default Emailverification;