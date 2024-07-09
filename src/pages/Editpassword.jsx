import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputPasswordfieldCom from "../components/items/InputPasswordfieldCom";
import { Avatar, Box, Card, CardContent, Container, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import ButtonMD from "../components/items/ButtonMD";
import { useNavigate } from "react-router-dom";
import url from "../url";
import Sidebar from "../components/sidebar/Sidebar";
import background from "../Assets/background.PNG";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import endpoint from "../Endpointurl";
import { io } from "socket.io-client";

function Editpassword() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [profiledetails, setProfiledetails] = useState('');
    const [oldpassword, setOldpassword] = useState('');
    const [retrievepassword, setRetrievepassword] = useState('');
    const [emptyfieldalert, setEmptyfieldalert] = useState(false);
    const [notmatchedalert, setNotmatchedalert] = useState(false);

    useEffect(() => {
        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            console.log(details);
            setProfiledetails(details);
        }

        const userpassword = localStorage.getItem('userpassword');
        if (userpassword) {
            setRetrievepassword(userpassword)
        }

    }, [])

    const validationSchema = yup.object({
        password: yup
            .string('Enter your password')
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one digit')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        confirmpassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmpassword: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(profiledetails?.data?.email, values);

            if (oldpassword.length == 0) {
                setEmptyfieldalert(true);
                setTimeout(async () => {
                    setEmptyfieldalert(false);
                }, 3000)
            } else if (oldpassword != retrievepassword) {
                setNotmatchedalert(true);
                setTimeout(async () => {
                    setNotmatchedalert(false);
                }, 3000)
            } else {

                setLoading(true);

                setTimeout(async () => {

                    var InsertAPIURL = `${url}user/reset_password`
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    };
                    var Data = {
                        "email": profiledetails?.data?.email,
                        "password": values.password
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

                                toast.success(response.message, {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                                setTimeout(() => {
                                    localStorage.setItem("userpassword", values.password);
                                    // navigate(`${endpoint}`);
                                    setLoading(false);
                                    setOldpassword("");
                                    formik.resetForm();
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
        }
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

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
                                Change Password
                            </Typography>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>

                                <Card sx={{ mt: { xs: 0, md: 5 }, p: 0, backgroundColor: "transparent", borderRadius: "10px", boxShadow: "none", border: "1px solid transparent", width: { xs: "90%", md: "50%" } }}>
                                    <CardContent>
                                        {/* onSubmit={formik.handleSubmit} */}
                                        <form onSubmit={formik.handleSubmit}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} md={12}>
                                                    <Stack direction="column">
                                                        <div style={{ marginBottom: "10px" }}>
                                                            <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize="17px" mb={1}>
                                                                Old Password
                                                            </Typography>
                                                            <TextField
                                                                InputLabelProps={{
                                                                    style: {
                                                                        color: isFocused ? 'gray' : 'gray',
                                                                        fontSize: "15px"
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    style: {
                                                                        color: isFocused ? 'gray' : 'gray',
                                                                        fontSize: "14px",
                                                                        fontWeight: "bold",
                                                                        borderRadius: "10px",
                                                                        backgroundColor: "transparent"
                                                                    },
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                aria-label="toggle password visibility"
                                                                                onClick={handleClickShowPassword}
                                                                                onMouseDown={handleMouseDownPassword}
                                                                                edge="end"
                                                                            >
                                                                                {showPassword ? <VisibilityOff sx={{ fontSize: "20px", color: "#C4B1AB" }} /> : <Visibility sx={{ fontSize: "20px", color: "#C4B1AB" }} />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                                sx={{
                                                                    borderRadius: "10px",
                                                                    width: "100%",
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            border: isFocused ? '3px solid gray' : '3px solid #BEBEBE',
                                                                        },
                                                                        '&:hover fieldset': {
                                                                            border: '3px solid #F5BC01'
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            border: '3px solid #F5BC01'
                                                                        },
                                                                    },
                                                                }}
                                                                onFocus={handleFocus}

                                                                style={{ borderRadius: "100px", height: '45px', width: '100%' }}
                                                                // placeholder={label}
                                                                autoFocus={false}
                                                                value={oldpassword}
                                                                type={showPassword ? 'text' : 'password'}
                                                                // disabled={disabled}
                                                                onChange={(e) => { setOldpassword(e.target.value) }}
                                                            />

                                                            <Box align="left" sx={{ pt: 1, height: "20px" }}>
                                                                {emptyfieldalert ?
                                                                    <span style={{ marginTop: "2px", fontSize: "14px", color: "red" }}>
                                                                        Old password is required
                                                                    </span>
                                                                    :
                                                                    <></>}

                                                                {notmatchedalert ?
                                                                    <span style={{ marginTop: "2px", fontSize: "14px", color: "red" }}>
                                                                        Old password is in correct
                                                                    </span>
                                                                    :
                                                                    <></>}
                                                            </Box>

                                                        </div>

                                                        <div style={{ marginBottom: "10px" }}>
                                                            <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize="17px" mb={1}>
                                                                New Password
                                                            </Typography>
                                                            <InputPasswordfieldCom
                                                                value={formik.values.password}
                                                                onChngeterm={(e) => formik.setFieldValue("password", e.target.value)}
                                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                                helperText={formik.touched.password && formik.errors.password}
                                                                // icon={<Lock sx={{ color: "#B6BEA9" }} />}
                                                                type="password"
                                                                variant="outlined"
                                                            // placeholder="Password"
                                                            />
                                                        </div>

                                                        <div style={{ marginBottom: "10px" }}>
                                                            <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize="17px" mb={1}>
                                                                Confirm Password
                                                            </Typography>
                                                            <InputPasswordfieldCom
                                                                value={formik.values.confirmpassword}
                                                                onChngeterm={(e) => formik.setFieldValue("confirmpassword", e.target.value)}
                                                                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                                                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                                                                // icon={<Lock sx={{ color: "#B6BEA9" }} />}
                                                                type="password"
                                                                variant="outlined"
                                                            // placeholder="Password"
                                                            />
                                                        </div>

                                                        {/* onClick={formik.handleSubmit}  */}
                                                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "30px" }}>
                                                            <ButtonMD variant="contained" title="Change" width="50%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClick={formik.handleSubmit} />
                                                        </div>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </form>

                                    </CardContent>
                                </Card>
                            </div>
                        </Container>
                    </Box>
                }
            />
            <ToastContainer />
        </>
    )
}

export default Editpassword;