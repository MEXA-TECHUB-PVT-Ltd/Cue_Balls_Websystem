import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Inputfield from "../components/items/Inputfield";
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import { Avatar, Box, Button, Grid, Stack, useMediaQuery } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import ButtonMD from "../components/items/ButtonMD";
import { useState } from "react";
import mainBG from "../Assets/main_bg.png";
import InputPasswordfield from "../components/items/InputPasswordfield";
import { Google, Lock, LockTwoTone } from "@mui/icons-material";
import CardMD from "../components/items/CardMD";
import { NavLink, useNavigate } from "react-router-dom";
import url from "../url";
import endpoint from "../Endpointurl";
import { useEffect } from "react";
import { auth, googleProvider } from "../components/Firebaseconfiguration";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [googleLoading, setGoogleLoading] = useState(false);

    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        username: yup
            .string('Enter your username')
            .required('Username is required'),
        email: yup
            .string()
            .email("Invalid email")
            .matches(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email")
            .required('Required Email'),
        password: yup
            .string('Enter your password')
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one digit')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        confirmpassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            email: '',
            password: '',
            confirmpassword: ""
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);

            setLoading(true);
            setTimeout(() => {
                var InsertAPIURL = `${url}user/create_account`
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                var Data = {
                    "user_name": values.username,
                    "email": values.email,
                    "password": values.password,
                    "signup_type": "email"
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
                            localStorage.setItem('profiledetails', JSON.stringify(response));
                            localStorage.setItem("userpassword", values.password);
                            localStorage.setItem('username', JSON.stringify(response?.data.user_name));
                            navigate(`${endpoint}dashboard`)
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

    // google

    const googleHandler = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log(error)
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user) {
            setGoogleLoading(true);
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setGoogleLoading(false);
                    ResponseGoogle(res.data, user.access_token);
                    console.log(res.data);
                    localStorage.setItem('username', JSON.stringify(res?.data?.name));
                })
                .catch((err) => {
                    setGoogleLoading(false);
                    console.log(err);
                });
        }
    }, [user]);

    const ResponseGoogle = (data, token) => {

        // console.log("data", data);
        // console.log("token", token);

        setGoogleLoading(true);
        const googleData = {

            "user_name": data.name,
            email: data.email,
            access_token: token,
            signup_type: 'google'

        };
        fetch(`${url}user/create_account`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(googleData)
        })
            .then((res) => res.json())
            .then((res) => {
                setGoogleLoading(false);
                if (res.error) {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else {
                    localStorage.setItem('profiledetails', JSON.stringify(res));
                    localStorage.setItem('username', JSON.stringify(res?.data.user_name));
                    navigate(`${endpoint}dashboard`);
                }
            })
            .catch((error) => {
                setGoogleLoading(false);
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            });
    };

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${mainBG})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden"
                }}
            >
                <div style={{ display: "flex", alignContent: "center", alignItems: "center", height: "100vh" }}>
                    <CardMD
                        content={
                            <>
                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", paddingBottom: 0 }}>
                                    <TypographyMD variant='paragraph' label="Create your Account" color="white" marginLeft={0} fontFamily="Rubik" fontSize={{ xs: "20px", md: "33px" }} fontWeight={450} align="center" />
                                </div>

                                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: 3 }}>
                                    <TypographyMD variant='paragraph' label="Already have an account? " color="white" marginLeft={0} fontFamily="Rubik" fontSize={{ xs: "12px", md: "16px" }} fontWeight={400} align="center" />
                                    <NavLink to={`${endpoint}`} style={{ textDecoration: "none" }}>
                                        <TypographyMD variant='paragraph' label=" Sign In" color="#FFE064" marginLeft={0} fontFamily="Rubik" fontSize={{ xs: "12px", md: "16px" }} fontWeight={400} align="center" />
                                    </NavLink>
                                </Box>

                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <div style={{ marginBottom: '5px' }}>
                                            <Inputfield
                                                autoFocus={false}
                                                value={formik.values.username}
                                                onChngeterm={(e) => formik.setFieldValue("username", e.target.value)}
                                                error={formik.touched.username && Boolean(formik.errors.username)}
                                                helperText={formik.touched.username && formik.errors.username}
                                                type="text"
                                                variant="outlined"
                                                label=""
                                                placeholder="Username"
                                            />
                                        </div>

                                        <div style={{ marginBottom: '5px' }}>
                                            <Inputfield
                                                autoFocus={false}
                                                value={formik.values.email}
                                                onChngeterm={(e) => formik.setFieldValue("email", e.target.value)}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                type="text"
                                                variant="outlined"
                                                label=""
                                                placeholder="Email Address"
                                            />
                                        </div>

                                        <div style={{ marginBottom: '10px' }}>
                                            <InputPasswordfield
                                                value={formik.values.password}
                                                onChngeterm={(e) => formik.setFieldValue("password", e.target.value)}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                                type="password"
                                                variant="outlined"
                                                placeholder="Password"
                                            />
                                        </div>

                                        <div style={{ marginBottom: '10px' }}>
                                            <InputPasswordfield
                                                value={formik.values.confirmpassword}
                                                onChngeterm={(e) => formik.setFieldValue("confirmpassword", e.target.value)}
                                                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                                                type="password"
                                                variant="outlined"
                                                placeholder="Confirm Password"
                                            />
                                        </div>

                                        <ButtonMD variant="contained" title="Create Account" width="100%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} />
                                    </div>
                                </form>

                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 2 }}>
                                    <TypographyMD variant='paragraph' label="or" color="white" marginLeft={0} fontFamily="Rubik" fontSize="16px" fontWeight={400} align="center" />
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
                                    <ButtonMD
                                        variant="outlined"
                                        title="Signup With Google" width="80%"
                                        color="primary"
                                        startIcon={<Google />}
                                        onClickTerm={googleHandler}
                                        disabled={googleLoading}
                                    />
                                </Box>
                            </>
                        }
                    />
                </div>
            </Box>


            <ToastContainer />

        </>
    )
}

export default Signup;