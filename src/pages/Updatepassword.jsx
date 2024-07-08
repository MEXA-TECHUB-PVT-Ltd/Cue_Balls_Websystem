import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid, IconButton, Modal, InputAdornment, Menu, MenuItem, OutlinedInput, Stack, Typography, TextField, Button, Select, InputLabel, FormControl } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TypographyMD from "../components/items/Typography";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import url from "../url";
import endpoint from "../Endpointurl";
import ButtonMD from "../components/items/ButtonMD";
import InputPasswordfield from "../components/items/InputPasswordfield";
import { LockTwoTone, Visibility, VisibilityOff } from "@mui/icons-material";
import { message } from "antd";

function UpdatePassword() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [emptyfieldalert, setEmptyfieldalert] = useState(false);
    const [notmatchedalert, setNotmatchedalert] = useState(false);

    const [oldpassword, setOldpassword] = useState('');
    const [retrieveemail, setRetrieveemail] = useState('');
    const [retrievepassword, setRetrievepassword] = useState('');

    useEffect(() => {
        const adminemail = JSON.parse(localStorage.getItem('ID_User'));
        if (adminemail) {
            setRetrieveemail(adminemail.result.email);
        }

        const adminpassword = JSON.parse(localStorage.getItem('password'));
        if (adminpassword) {
            setRetrievepassword(adminpassword)
        }

    }, [])

    const validationSchema = yup.object({
        newpassword: yup.string()
            .required('New password is required')
            .min(6, 'Password must be at least 6 characters long'),
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
            }
            else {
                var InsertAPIURL = `${url}admin/updatePassword`
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                var Data = {
                    "email": retrieveemail,
                    "newPassword": values.confirmpassword
                };
                fetch(InsertAPIURL, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(Data),
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        setLoading(true);
                        console.log(response)
                        if (response.status) {
                            setLoading(true);
                            setTimeout(async () => {
                                toast.success("Password is updated successfully ", {
                                    position: toast.POSITION.BOTTOM_CENTER
                                });
                                setLoading(false);
                                formik.resetForm();
                                setOldpassword("");
                            }, 3000)
                        } else {
                            setTimeout(async () => {
                                setLoading(false);
                                toast.error(response.message, {
                                    position: toast.POSITION.BOTTOM_CENTER
                                });
                                setLoading(false);
                            }, 3000)
                        }
                    }
                    )
                    .catch(error => {
                        alert(error);
                    });
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

    return (
        <>
            <Sidebar
                componentData={
                    <Box height="100vh">
                        <Grid container spacing={0}>
                            <Grid xs={12} align="" sx={{ pb: 2, pl: 2, pr: 2 }} p={1} >
                                <Topbar />
                            </Grid>

                            <Grid xs={12} sm={4} align="" p={1} >
                                <TypographyMD variant='paragraph' label="Update Password" color="text.secondary" marginLeft={1} fontSize="25px" fontWeight={550} align="center" />
                            </Grid>
                        </Grid>

                        <Grid xs={12} align="center">
                            <form onSubmit={formik.handleSubmit} >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    height: "60vh",
                                }}>
                                    <Box width={{ xs: "97%", md: "40%" }}>
                                        <div style={{ marginBottom: '15px' }}>
                                            <FormControl variant="standard" fullWidth>
                                                <TextField
                                                    InputLabelProps={{
                                                        style: {
                                                            color: isFocused ? '#FF5722' : 'gray',
                                                            fontSize: "15px"
                                                        },
                                                    }}
                                                    sx={{
                                                        borderRadius: "10px",
                                                        width: "100%",
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                border: isFocused ? '1px solid #FF5722' : '1px solid #BEBEBE',
                                                            },
                                                            '&:hover fieldset': {
                                                                border: '1px solid #BEBEBE',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                border: '1px solid #FF5722',
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

                                                    InputProps={{
                                                        style: {
                                                            color: isFocused ? 'gray' : 'gray',
                                                            fontSize: "13px"
                                                        },
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    label="Old Password"
                                                />
                                            </FormControl>
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

                                        <div style={{ marginBottom: '15px' }}>
                                            <InputPasswordfield
                                                value={formik.values.newpassword}
                                                onChngeterm={(e) => formik.setFieldValue("newpassword", e.target.value)}
                                                error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                                                helperText={formik.touched.newpassword && formik.errors.newpassword}
                                                icon={<LockTwoTone />}
                                                type="password"
                                                variant="outlined"
                                                label="New Password"
                                            />
                                        </div>

                                        <div style={{ marginBottom: '15px' }}>
                                            <InputPasswordfield
                                                value={formik.values.confirmpassword}
                                                onChngeterm={(e) => formik.setFieldValue("confirmpassword", e.target.value)}
                                                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                                                icon={<LockTwoTone />}
                                                type="password"
                                                variant="outlined"
                                                label="Confirm Password"
                                            />
                                        </div>

                                        <ButtonMD variant="contained" title="Update Password" width="70%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="50px" disabled={loading} />

                                    </Box>
                                </div>
                            </form>
                        </Grid>
                    </Box >
                }
            />
            <ToastContainer />
        </>
    )
}

export default UpdatePassword;