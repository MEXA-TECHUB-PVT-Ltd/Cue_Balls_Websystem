import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import TypographyMD from "../components/items/Typography";
import Topbar from "../components/topbar/Topbar";
import { ArrowBackIos, ArrowForwardIos, Block, Error as MuiError, FilterAlt, Search, Visibility } from "@mui/icons-material"
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
    const handleSuccessCalled = useRef(false);

    const [profiledetails, setProfiledetails] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const payerId = urlParams.get('PayerID');

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

        const deposit_amount = localStorage.getItem('deposit_amount');
        if (deposit_amount) {
            setAmount(deposit_amount);
        }

        if (paymentId && payerId && !handleSuccessCalled.current) {
            handleSuccessCalled.current = true;
            handleSuccess(details, deposit_amount, paymentId, payerId);
        }
    }, []);

    const handleSuccess = async (details, deposit_amount, paymentId, payerId) => {
        await fetch(`${url}execute-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentId, payerId }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("data");

                if (!data.error) {
                    console.log('Payment successful:', data);
                    setOpensuccess(true);

                    var InsertAPIURL = `${url}create_payment_paypal-db-wallet`
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    };
                    var Data = {
                        "user_id": details?.data?.user_id,
                        "amount": deposit_amount
                    };
                    fetch(InsertAPIURL, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(Data),
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                        }
                        )
                        .catch(error => {
                            // setLoading(false);
                            toast.error(error, {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                        });

                } else {
                    toast.error("Payment not approved", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .catch(error => {
                console.error('Error executing payment:', error);
            });
    };

    return (
        <>
            <ModalSuccess
                open={opensuccess}
                onClose={() => setOpensuccess(false)}
                title="Amount Deposit Successfully"
                // subheading={`User ${userdetails.status == "unblock" ? "block" : "unblock"} Successfully`}
                data={
                    <ButtonMD variant="contained" title="ok" width="60%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" onClickTerm={() => navigate(`${endpoint}wallet`)} />
                }
            />

            <ToastContainer />
        </>
    )
}

export default Paypalsuccess;