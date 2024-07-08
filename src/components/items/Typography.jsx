import React from "react"
import { Typography } from "@mui/material";

function TypographyMD({ align, color, label, variant, fontFamily, fontWeight, fontSize, marginLeft, marginBottom, marginTop }) {
    return (
        <>
            <Typography variant={variant} gutterBottom textAlign={align} sx={{ fontFamily: fontFamily, fontWeight: fontWeight, marginLeft: marginLeft, marginBottom: "marginBottom", letterSpacing: '0px', color: color, fontSize: fontSize, marginTop: marginTop }}>
                {label}
            </Typography>
        </>
    )
}

export default TypographyMD;