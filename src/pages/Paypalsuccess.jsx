import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import Topbar from "../components/topbar/Topbar";
import { ArrowBackIos, ArrowForwardIos, Block, Error, FilterAlt, Search, Visibility } from "@mui/icons-material"
import background from "../Assets/background.PNG";
import ButtonMD from "../components/items/ButtonMD";
import "./scrollbar.css"
import { ToastContainer, toast } from 'react-toastify';
import ModalAdd from "../components/items/Modal";
import Inputfield from "../components/items/Inputfield";
import { useFormik } from "formik";
import * as yup from 'yup';
import endpoint, { url_FE } from "../Endpointurl";
import url from "../url";
import ModalSuccess from "../components/items/ModalSuccess";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Paypalsuccess() {

    const navigate = useNavigate();

    // success 
    const [opensuccess, setOpensuccess] = useState(false);

    useEffect(() => {
        setOpensuccess(true);
    }, [])

    // const [status, setStatus] = useState('');

    // useEffect(() => {
    //     // Initialize the socket connection
    //     const socket = io(url);

    //     // Define the message listener
    //     const messageListener = (msg) => {
    //         console.log(msg);
    //         switch (msg.status) {
    //             case "created":
    //                 console.log("game-created");// show triangle screen
    //                 navigate(`${endpoint}playgame`);
    //                 break;
    //             case "waiting":
    //                 console.log("game-status-change"); // show waiting screen ss in phone if status is waiting  
    //                 break;
    //             case "started":
    //                 console.log("game-started"); //   if status is started then show animation 
    //                 break;
    //             case "result-anounced":
    //                 console.log("result-anounced");
    //                 break;
    //             case "restart":
    //                 console.log("game-restart"); // show restart game screen ss in phone
    //                 break;
    //             case "added-participants":
    //                 console.log("added-participants");
    //                 break;
    //             case "deleted":
    //                 console.log("game-deleted");
    //                 navigate(`${endpoint}dashboard`);
    //                 break;
    //             default:
    //                 console.log("Unknown status");
    //         }
    //         console.log(":ddggfgf");
    //         setStatus("dffgfdfg");
    //     };

    //     // Set up the socket event listener
    //     socket.on("received-data", messageListener);

    //     // Cleanup function to remove the message listener and disconnect socket
    //     return () => {
    //         socket.off("received-data", messageListener);
    //         socket.disconnect();
    //     };
    // }, [url]);

    return (
        <>
            <ModalSuccess
                open={opensuccess}
                onClose={() => setOpensuccess(false)}
                title="Amount Deposit Successfully"
                // subheading={`User ${userdetails.status == "unblock" ? "block" : "unblock"} Successfully`}
                data={
                    <ButtonMD variant="contained" title="ok" width="60%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" onClickTerm={() => navigate(`${endpoint}playgame`)} />
                }
            />

            <ToastContainer />
        </>
    )
}

export default Paypalsuccess;