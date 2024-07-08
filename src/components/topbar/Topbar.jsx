import React from "react";
import endpoint from "../../Endpointurl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Assignment, CheckCircle, ChevronRight, Close, Info, KeyboardArrowDown, Lock, LockTwoTone, Logout, Person, PrivacyTip, Search, Settings, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Divider, FormControl, Grid, IconButton, InputAdornment, Menu, MenuItem, Modal, OutlinedInput, Stack, TextField, Tooltip, Typography } from "@mui/material";
import TypographyMD from "../items/Typography";
import ButtonMD from "../items/ButtonMD";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from "react";
import InputPasswordfield from "../items/InputPasswordfield";
import ModalAdd from "../items/Modal";
import ModalSuccess from "../items/ModalSuccess";

function Topbar({ array }) {
    const navigate = useNavigate();

    const [isloading, setIsloading] = useState(false);
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const [anchorEltop, setAnchorEltop] = React.useState(null);
    const openmenu = Boolean(anchorEltop);

    const [openmodallogout, setOpenmodallogout] = useState(false);
    const handleOpenmodallogout = () => {
        setOpenmodallogout(true);
        setAnchorEltop(null);
    };
    const handleClosemodallogout = () => setOpenmodallogout(false);

    const logout = async () => {
        setLoading(true);
        setTimeout(() => {
            navigate(`${endpoint}`)
            setOpenmodallogout(false);
            setLoading(false);
        }, 3000);

        const items = JSON.parse(localStorage.getItem('ID_User'));
        console.log(items)
        if (items != null) {
            localStorage.clear("items");
            setTimeout(() => {
                navigate(`${endpoint}`)
            }, 3000);
        } else {
            navigate(`${endpoint}dashboard`);
        }

    }

    // password
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
            } else {
                setOpenmodalpassword(false);
                setAnchorEltop(null);
                handleOpensuccess();
            }

            // if (oldpassword.length == 0) {
            //     setEmptyfieldalert(true);
            //     setTimeout(async () => {
            //         setEmptyfieldalert(false);
            //     }, 3000)
            // } else if (oldpassword != retrievepassword) {
            //     setNotmatchedalert(true);
            //     setTimeout(async () => {
            //         setNotmatchedalert(false);
            //     }, 3000)
            // }
            // else {
            //     var InsertAPIURL = `${url}admin/updatePassword`
            //     var headers = {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     };
            //     var Data = {
            //         "email": retrieveemail,
            //         "newPassword": values.confirmpassword
            //     };
            //     fetch(InsertAPIURL, {
            //         method: 'PUT',
            //         headers: headers,
            //         body: JSON.stringify(Data),
            //     })
            //         .then(response => response.json())
            //         .then(response => {
            //             console.log(response);
            //             setLoading(true);
            //             console.log(response)
            //             if (response.status) {
            //                 setLoading(true);
            //                 setTimeout(async () => {
            //                     toast.success("Password is updated successfully ", {
            //                         position: toast.POSITION.BOTTOM_CENTER
            //                     });
            //                     setLoading(false);
            //                     formik.resetForm();
            //                     setOldpassword("");
            //                 }, 3000)
            //             } else {
            //                 setTimeout(async () => {
            //                     setLoading(false);
            //                     toast.error(response.message, {
            //                         position: toast.POSITION.BOTTOM_CENTER
            //                     });
            //                     setLoading(false);
            //                 }, 3000)
            //             }
            //         }
            //         )
            //         .catch(error => {
            //             alert(error);
            //         });
            // }
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

    const [openmodalpassword, setOpenmodalpassword] = useState(false);
    const handleOpenmodalpassword = () => {
        setOpenmodalpassword(true);
        setAnchorEltop(null);
    };
    const handleClosemodalpassword = () => setOpenmodalpassword(false);

    const [opensuccess, setOpensuccess] = useState(false);
    const handleOpensuccess = () => {
        setOpensuccess(true)
        setTimeout(() => {
            setOpensuccess(false)
        }, 3000);
    };
    const handleClosesuccess = () => setOpensuccess(false);

    const [searchTerm, setSearchTerm] = useState('');
    // const filteredData = array.filter(item =>
    //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const highlightMatch = (text, term) => {
        const lowerText = text.toLowerCase();
        const lowerTerm = term.toLowerCase();
        const startIndex = lowerText.indexOf(lowerTerm);

        if (startIndex === -1) {
            return text;
        }

        const beforeMatch = text.slice(0, startIndex);
        const match = text.slice(startIndex, startIndex + term.length);
        const afterMatch = text.slice(startIndex + term.length);
        return (
            <>
                {beforeMatch}
                <span style={{ backgroundColor: '#FF144D29' }}>{match}</span>
                {afterMatch}
            </>
        );
    };

    return (
        <>
            <Stack direction="row"
                id="basic-button"
                aria-controls={openmenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openmenu ? 'true' : undefined}
                onClick={(event) => {
                    setAnchorEltop(event.currentTarget);
                }}>
                <Tooltip title="Accont">
                    <Avatar sx={{ mt: { xs: 1, sm: 1, md: 0, lg: 0 }, backgroundColor: "white" }}

                    >
                        <Person sx={{ cursor: "pointer", color: "#C4B1AB" }} />
                    </Avatar>
                </Tooltip>
                <Box sx={{ mt: 2.5, ml: -1.2, height: "20px", borderRadius: "2px", backgroundColor: "white" }}>
                    <KeyboardArrowDown sx={{ fontSize: "20px", color: "#C4B1AB" }} />
                </Box>
            </Stack>

            <Menu
                id="basic-menu"
                anchorEl={anchorEltop}
                open={openmenu}
                onClose={() => setAnchorEltop(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    sx: {
                        mt: 3,
                        overflow: 'visible',
                        width: 200,
                        // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 46,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem  >
                    <Grid container spacing={0}>
                        <Grid xs={10}>
                            <span style={{ marginLeft: 0, color: "gray", font: "normal normal bold 13px/17px Arial" }}>admin@gmail.com</span>
                        </Grid>

                        <Grid xs={2} align="right">
                            <Logout sx={{ fontSize: "17px", color: "gray" }} onClick={handleOpenmodallogout} />
                        </Grid>
                    </Grid>
                </MenuItem>
                <Grid container spacing={0}>
                    <Grid xs={12} align="center">
                        <Divider sx={{ width: "80%" }} />
                    </Grid>
                </Grid>
                <MenuItem onClick={handleOpenmodalpassword}>
                    <Grid container spacing={0}>
                        <Grid xs={8}>
                            <span style={{ marginLeft: 0, color: "#1E1E1E", font: "normal normal normal 14px/16px Arial" }}>Update Password</span>
                        </Grid>

                        <Grid xs={4} align="right">
                            <ChevronRight sx={{ fontSize: "20px", color: "#1E1E1E" }} />
                        </Grid>
                    </Grid>

                </MenuItem>
            </Menu>

            {/* logout modal */}
            <ModalAdd
                open={openmodallogout}
                onClose={() => setOpenmodallogout(false)}
                title="Logout"
                data={
                    <>
                        <Grid container spacing={0} p={{ xs: 2, md: 3, lg: 3, xl: 3 }}>

                            <Grid xs={12} align="center"  >
                                <Stack direction="column" spacing={1} pb={3}>
                                    <TypographyMD variant='paragraph' label="Confirmation" color="gray" marginLeft={0} fontSize="25px" fontWeight={550} align="center" />
                                    <TypographyMD variant='paragraph' label="Do you want to logout ?" color="#000000" marginLeft={0} fontSize="15px" fontWeight={450} align="center" />
                                </Stack>
                            </Grid>

                            <Grid xs={6} align="" onClick={() => setOpenmodallogout(false)}>
                                <ButtonMD variant="outlined" title="Cancel" width="90%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" />
                            </Grid>

                            <Grid xs={6} align="right" >
                                <ButtonMD variant="contained" title="Logout" width="90%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClickTerm={logout} />
                            </Grid>

                        </Grid>
                    </>
                }
            />

            {/* <Modal
                open={openmodallogout}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 450, xl: 450 }} height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={12} align="right">
                            <Close onClick={() => setOpenmodallogout(false)} />
                        </Grid>

                        <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>

                            <TypographyMD variant='paragraph' label="Confirmation" color="gray" marginLeft={0} fontSize="20px" fontWeight={550} align="center" />


                        </Grid>

                        <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
                            <TypographyMD variant='paragraph' label="Do you want to logout ?" color="#000000" marginLeft={0} fontSize="15px" fontWeight={450} align="center" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={3}>
                        <Grid xs={6} align="" onClick={() => setOpenmodallogout(false)}>
                            <ButtonMD variant="outlined" title="Cancel" width="90%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="50px" />
                        </Grid>

                        <Grid xs={6} align="right" onClick={() => logout()}>
                            <ButtonMD variant="contained" title="Logout" width="90%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="50px" disabled={loading} />
                        </Grid>
                    </Grid>

                </Box>
            </Modal> */}

            {/* password modal */}
            <ModalAdd
                open={openmodalpassword}
                onClose={() => setOpenmodalpassword(false)}
                title="Update Password"
                data={
                    <>
                        <Grid container spacing={0} sx={{ pl: 3, pr: 3 }}>
                            <Grid xs={12} align="left" >
                                <form onSubmit={formik.handleSubmit} >
                                    <div>
                                        <Box sx={{ marginTop: "30px", marginBottom: "50px" }} width={{ xs: "97%", md: "100%" }}>
                                            <div style={{ marginBottom: '15px' }}>
                                                <div style={{ marginBottom: '5px' }}>
                                                    <TypographyMD variant='paragraph' label="Old Password" color="#C4B1AB" marginLeft={0} fontFamily="Laila" fontSize="15px" fontWeight={450} align="left" />
                                                </div>
                                                <FormControl variant="standard" fullWidth>
                                                    <TextField
                                                        InputLabelProps={{
                                                            style: {
                                                                color: isFocused ? 'gray' : 'gray',
                                                                fontSize: "15px"
                                                            },
                                                        }}
                                                        sx={{
                                                            borderRadius: "10px",
                                                            width: "100%",
                                                            '& .MuiOutlinedInput-root': {
                                                                '& fieldset': {
                                                                    border: isFocused ? '1px solid gray' : '1px solid #BEBEBE',
                                                                },
                                                                '&:hover fieldset': {
                                                                    border: '1px solid #BEBEBE',
                                                                },
                                                                '&.Mui-focused fieldset': {
                                                                    border: '1px solid gray',
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
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <Lock />
                                                                </InputAdornment>
                                                            ),
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
                                                <div style={{ marginBottom: '5px' }}>
                                                    <TypographyMD variant='paragraph' label="New Password" color="#C4B1AB" marginLeft={0} fontFamily="Laila" fontSize="15px" fontWeight={450} align="left" />
                                                </div>
                                                <InputPasswordfield
                                                    value={formik.values.newpassword}
                                                    onChngeterm={(e) => formik.setFieldValue("newpassword", e.target.value)}
                                                    error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                                                    helperText={formik.touched.newpassword && formik.errors.newpassword}
                                                    icon={<Lock />}
                                                    type="password"
                                                    variant="outlined"
                                                />
                                            </div>

                                            <div style={{ marginBottom: '15px' }}>
                                                <div style={{ marginBottom: '5px' }}>
                                                    <TypographyMD variant='paragraph' label="Confirm Password" color="#C4B1AB" marginLeft={0} fontFamily="Laila" fontSize="15px" fontWeight={450} align="left" />
                                                </div>
                                                <InputPasswordfield
                                                    value={formik.values.confirmpassword}
                                                    onChngeterm={(e) => formik.setFieldValue("confirmpassword", e.target.value)}
                                                    error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                                                    helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                                                    icon={<Lock />}
                                                    type="password"
                                                    variant="outlined"
                                                />
                                            </div>

                                            <ButtonMD variant="contained" title="Update Password" width="100%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="50px" disabled={loading} />

                                        </Box>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>
                    </>
                }
            />

            {/* password success */}
            <ModalSuccess
                open={opensuccess}
                onClose={handleClosesuccess}
                title="Success"
                subheading="Password Updated Successfully"
            />

        </>
    )
}

export default Topbar;