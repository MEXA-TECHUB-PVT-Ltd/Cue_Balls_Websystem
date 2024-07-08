import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import logo from "../Assets/logo.png";
import mainBG from "../Assets/main_bg.png";
import { useState } from "react";
import InputPasswordfield from "../components/items/InputPasswordfield";
import { KeyboardArrowLeft, LockTwoTone } from "@mui/icons-material";
import TypographyMD from "../components/items/Typography";
import { Avatar, Box } from "@mui/material";
import ButtonMD from "../components/items/ButtonMD";
import CardMD from "../components/items/CardMD";
import { useNavigate } from "react-router-dom";
import endpoint from "../Endpointurl";
import url from "../url";
import { useEffect } from "react";

function SetPassword() {
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
    const validationSchema = yup.object({
        newpassword: yup
            .string('Enter your password')
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one digit')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        confirmpassword: yup.string()
            .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const formik = useFormik({
        initialValues: {
            newpassword: '',
            confirmpassword: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);

            setLoading(true);
            setTimeout(() => {
                var InsertAPIURL = `${url}user/reset_password`
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                var Data = {
                    "email": profiledetails,
                    "password": values.newpassword
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
                        } else {
                            localStorage.setItem("userpassword", values.newpassword);
                            navigate(`${endpoint}`);
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
                                    <TypographyMD variant='paragraph' label="Reset Password" color="white" marginLeft={0} fontFamily="Rubik" fontSize="33px" fontWeight={450} align="center" />
                                </div>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", paddingBottom: 20 }}>
                                    <TypographyMD variant='paragraph' label="Enter your new password below. Make sure it’s something secure and memorable." color="white" marginLeft={0} fontFamily="Rubik" fontSize="16px" fontWeight={400} align="center" />
                                </div>

                                <form onSubmit={formik.handleSubmit} >
                                    <div>
                                        <div style={{ marginBottom: '15px' }}>

                                            <InputPasswordfield
                                                value={formik.values.newpassword}
                                                onChngeterm={(e) => formik.setFieldValue("newpassword", e.target.value)}
                                                error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                                                helperText={formik.touched.newpassword && formik.errors.newpassword}
                                                // icon={<Lock sx={{ color: "#B6BEA9" }} />}
                                                type="password"
                                                variant="outlined"
                                                placeholder="New Password"
                                            />
                                        </div>

                                        <div style={{ marginBottom: '15px' }}>

                                            <InputPasswordfield
                                                value={formik.values.confirmpassword}
                                                onChngeterm={(e) => formik.setFieldValue("confirmpassword", e.target.value)}
                                                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                                                // icon={<Lock sx={{ color: "#B6BEA9" }} />}
                                                type="confirmpassword"
                                                variant="outlined"
                                                placeholder="Confirm Password"
                                            />
                                        </div>

                                        <ButtonMD variant="contained" title="Reset Password" width="100%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} />

                                        <Box align="center" pt={3}  >
                                            <div style={{ width: "fit-content", cursor: "pointer" }} onClick={() => navigate(`${endpoint}otpverification`)} >
                                                <KeyboardArrowLeft sx={{ color: "#FFE064" }} /> <TypographyMD variant=' ' label="Back" color="#FFE064" fontFamily="Rubik" marginLeft={0} fontSize="15px" fontWeight={450} align="" />
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

export default SetPassword;