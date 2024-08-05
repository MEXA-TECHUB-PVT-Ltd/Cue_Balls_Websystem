import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import "./ButtonMD.css";

function ButtonMD({ type, disabled, title, variant, onClickTerm, startIcon, fontSize, borderColor, backgroundColor, borderRadius, width }) {

    // console.log("disabled", onClickTerm)

    const [screenWidth, setScreenWidth] = useState('')
    // const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const color = "rgb(150, 143, 143)"
    const override = {
        display: ' block',
        margin: '0 auto',
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth < 400) {
                setScreenWidth(true)
            } else {
                setScreenWidth(false)

            }
        }, 1000);

        return () => clearInterval(interval);

    }, []);
    return (
        <>

            {screenWidth ?
                <>
                    {variant == "outlined" ?
                        <>
                            {disabled ? <>
                                <Button mb="30px"
                                    variant={variant}
                                    type={type}
                                    disabled={disabled}
                                    startIcon={<ClipLoader color={color} loading={disabled} css={override} size={15} />}
                                    onClick={onClickTerm}
                                    className="btn"
                                    style={{
                                        padding: "15px 30px",
                                        borderColor: { borderColor },
                                        width: width,
                                        height: "45px", boxShadow: "none", borderRadius: { borderRadius }
                                    }} >
                                    {title}
                                </Button>
                            </> : <>
                                <Button mb="30px"
                                    variant={variant}
                                    disabled={disabled}
                                    type={type}
                                    startIcon={startIcon}
                                    onClick={onClickTerm}

                                    style={{
                                        padding: "15px",
                                        borderColor: { borderColor },
                                        width: width
                                    }} >{title}</Button>
                            </>
                            }
                        </>
                        :
                        variant == "contained" ?
                            <>
                                {disabled ? <>
                                    <Button mb="30px"
                                        variant={variant}
                                        type={type}
                                        disabled={disabled}
                                        startIcon={<ClipLoader color={color} loading={disabled} css={override} size={15} />}
                                        onClick={onClickTerm}
                                        className="btn1"
                                        style={{
                                            backgroundColor: "#FFEA96", color: "#060502",
                                            border: "4px solid #F5BC01",
                                            boxShadow: "none",
                                            fontWeight: 600,
                                            fontSize: "13px",
                                            borderRadius: borderRadius,
                                            width: width
                                        }} >
                                        {title}
                                    </Button>
                                </> : <>
                                    <Button mb="30px"
                                        variant={variant}
                                        disabled={disabled}
                                        type={type}
                                        startIcon={startIcon}
                                        onClick={onClickTerm}
                                        className="btn"
                                        style={{
                                            backgroundColor: "#FFEA96", color: "#060502",
                                            border: "4px solid #F5BC01",
                                            boxShadow: "none",
                                            fontWeight: 600,
                                            fontSize: "13px",
                                            borderRadius: borderRadius,
                                            width: width
                                        }} >{title}</Button>
                                </>
                                }
                            </>
                            :
                            <>
                                {disabled ? <>
                                    <Button mb="30px"
                                        variant={variant}
                                        type={type}
                                        disabled={disabled}
                                        startIcon={<ClipLoader color={color} loading={disabled} css={override} size={15} />}
                                        onClick={onClickTerm}
                                        style={{
                                            width: width
                                        }} >
                                        {title}
                                    </Button>
                                </> : <>
                                    <Button mb="30px"
                                        variant={variant}
                                        disabled={disabled}
                                        type={type}
                                        startIcon={startIcon}
                                        onClick={onClickTerm}

                                        style={{
                                            width: width
                                        }} >{title}</Button>
                                </>
                                }
                            </>
                    }
                </>
                :
                <>
                    {/* Large Screen  */}
                    {variant == "outlined" ?
                        <>
                            {disabled ? <>
                                <Button mb="30px"
                                    variant={variant}
                                    type={type}
                                    disabled={disabled}
                                    startIcon={<ClipLoader color={color} loading={disabled} css={override} size={15} />}
                                    onClick={onClickTerm}

                                    style={{
                                        padding: "15px 30px",
                                        borderColor: "#FFEA96",
                                        color: "#FFEA96",
                                        textTransform: "capitalize",
                                        fontFamily: "Rubik",
                                        width: width,
                                        fontWeight: 450,
                                        fontSize: "15px",
                                        // borderRadius: borderRadius,
                                        height: "45px", boxShadow: "none", borderRadius: "10px"
                                    }} >
                                    {title}
                                </Button>
                            </> : <>
                                <Button mb="30px"
                                    variant={variant}
                                    disabled={disabled}
                                    type={type}
                                    startIcon={startIcon}
                                    onClick={onClickTerm}

                                    style={{
                                        padding: "15px 30px",
                                        borderColor: "#FFEA96",
                                        color: "#FFEA96",
                                        textTransform: "capitalize",
                                        fontFamily: "Rubik",
                                        width: width,
                                        fontWeight: 450,
                                        fontSize: "15px",
                                        // borderRadius: borderRadius,
                                        height: "45px", boxShadow: "none", borderRadius: "10px"
                                    }} >{title}</Button>
                            </>
                            }
                        </>
                        :
                        variant == "contained" ?
                            <>
                                {disabled ? <>
                                    <Button mb="30px"
                                        variant={variant}
                                        type={type}
                                        disabled={disabled}
                                        startIcon={<ClipLoader color={color} loading={disabled} css={override} size={15} />}
                                        onClick={onClickTerm}
                                        className="btn1"
                                        style={{
                                            backgroundColor: "#FFEA96", color: "#060502",
                                            border: "4px solid #F5BC01",
                                            fontWeight: 450,
                                            fontSize: "13px",
                                            borderRadius: borderRadius,
                                            fontFamily: "Rubik",
                                            width: width, boxShadow: "none"
                                        }} >
                                        {title}
                                    </Button>
                                </> : <>
                                    <Button mb="30px"
                                        variant={variant}
                                        disabled={disabled}
                                        type={type}
                                        startIcon={startIcon}
                                        onClick={onClickTerm}
                                        className="btn"

                                        style={{
                                            backgroundColor: "#FFEA96", color: "#060502",
                                            fontWeight: 450,
                                            fontSize: "13px",
                                            borderRadius: borderRadius,
                                            border: "4px solid #F5BC01",
                                            fontFamily: "Rubik",
                                            width: width, boxShadow: "none"
                                        }} >{title}</Button>
                                </>
                                }
                            </>
                            :
                            <>
                                {disabled ? <>
                                    <Button mb="30px"
                                        variant={variant}
                                        type={type}
                                        disabled={disabled}
                                        startIcon={<ClipLoader color={color} loading={disabled} css={override} size={15} />}
                                        onClick={onClickTerm}
                                        style={{
                                            width: width
                                        }} >
                                        {title}
                                    </Button>
                                </> : <>
                                    <Button mb="30px"
                                        variant={variant}
                                        disabled={disabled}
                                        type={type}
                                        startIcon={startIcon}
                                        onClick={onClickTerm}

                                        style={{
                                            width: width
                                        }} >{title}</Button>
                                </>
                                }
                            </>
                    }
                </>
            }

        </>
    )
}

export default ButtonMD;