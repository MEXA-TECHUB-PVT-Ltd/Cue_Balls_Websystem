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

function Contactus() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profiledetails, setProfiledetails] = useState("");

    // Simulated email value, you might get this from props, state, or an API call
    const userEmail = "user@example.com";

    useEffect(() => {

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

    }, []);

    const validationSchema = yup.object({
        firstname: yup
            .string('Enter your firstname')
            .required('First name is required'),
        lastname: yup
            .string('Enter your lastname')
            .required('Last name is required'),
        message: yup
            .string('Enter your message')
            .required('Message is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            message: ''
        },
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);

            setLoading(true);
            setTimeout(() => {
                var InsertAPIURL = `${url}contact_us/send_message`
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                var Data = {
                    "first_name": values.firstname,
                    "last_name": values.lastname,
                    "email": profiledetails?.data?.email,
                    "message": values.message

                };
                fetch(InsertAPIURL, {
                    method: 'POST',
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

                            // navigate(`${endpoint}playgame`)

                            toast.success(response.message, {
                                position: toast.POSITION.TOP_RIGHT
                            });

                            setTimeout(() => {
                                setLoading(false);
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

        },
    });

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
                        <Typography variant='h6' color="#F5BC01" align="center" fontFamily="Pacifico" fontSize={{ xs: "27px", sm: "37px", md: "57px" }} pt={4} mb={1}  >
                            Contact Us
                        </Typography>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
                            <Card sx={{ mt: { xs: 0, md: 0 }, p: 0, backgroundColor: "transparent", borderRadius: "10px", boxShadow: "none", border: "1px solid transparent", width: { xs: "90%", md: "50%" } }}>
                                <CardContent>

                                    <form onSubmit={formik.handleSubmit} >
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} md={12}>
                                                <Stack direction="column">

                                                    <Stack direction="row" spacing={2} width="100%">
                                                        <div style={{ marginBottom: "5px" }}>
                                                            <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize={{ xs: "13px", md: "17px" }} mb={1}>
                                                                First Name
                                                            </Typography>
                                                            <InputfieldCom
                                                                autoFocus={false}
                                                                value={formik.values.firstname}
                                                                onChngeterm={(e) => formik.setFieldValue("firstname", e.target.value)}
                                                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                                                helperText={formik.touched.firstname && formik.errors.firstname}
                                                                type="text"
                                                                variant="outlined"
                                                                label=""
                                                            />
                                                        </div>

                                                        <Box sx={{ flexGrow: 1 }} />

                                                        <div style={{ marginBottom: "5px" }}>
                                                            <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize={{ xs: "13px", md: "17px" }} mb={1}>
                                                                Last Name
                                                            </Typography>
                                                            <InputfieldCom
                                                                autoFocus={false}
                                                                value={formik.values.lastname}
                                                                onChngeterm={(e) => formik.setFieldValue("lastname", e.target.value)}
                                                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                                                helperText={formik.touched.lastname && formik.errors.lastname}
                                                                type="text"
                                                                variant="outlined"
                                                                label=""
                                                            />
                                                        </div>
                                                    </Stack>

                                                    <div style={{ marginBottom: "5px" }}>
                                                        <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize={{ xs: "13px", md: "17px" }} mb={1}>
                                                            Email
                                                        </Typography>
                                                        <InputfieldCom
                                                            autoFocus={false}
                                                            value={`${profiledetails?.data?.email}`}
                                                            // onChngeterm={(e) => formik.setFieldValue("email", e.target.value)}
                                                            // error={formik.touched.email && Boolean(formik.errors.email)}
                                                            // helperText="You cannot update your email address"
                                                            type="text"
                                                            variant="outlined"
                                                            label=""
                                                            disabled={true}
                                                        />
                                                    </div>

                                                    <div style={{ marginBottom: "5px" }}>
                                                        <Typography variant='h6' color="gray" align="left" fontFamily="Rubik" fontSize={{ xs: "13px", md: "17px" }} mb={1}>
                                                            Message
                                                        </Typography>
                                                        <InputfieldCom
                                                            autoFocus={false}
                                                            value={formik.values.message}
                                                            onChngeterm={(e) => formik.setFieldValue("message", e.target.value)}
                                                            error={formik.touched.message && Boolean(formik.errors.message)}
                                                            helperText={formik.touched.message && formik.errors.message}
                                                            type="text"
                                                            variant="outlined"
                                                            multiline
                                                            rows={4}
                                                            label=""
                                                        />
                                                    </div>

                                                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "5px" }}>
                                                        <ButtonMD variant="contained" title="Send" width="50%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClick={formik.handleSubmit} />
                                                    </div>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </form>

                                </CardContent>
                            </Card>
                        </div>
                    </Box>
                }
            />
            <ToastContainer />
        </>
    );
}

export default Contactus;
