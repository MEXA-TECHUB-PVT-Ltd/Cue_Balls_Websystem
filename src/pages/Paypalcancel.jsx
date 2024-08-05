import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import endpoint from "../Endpointurl";

function Paypalcancel() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`${endpoint}wallet`);
    }, []);

    return (
        <>
        </>
    )
}

export default Paypalcancel;