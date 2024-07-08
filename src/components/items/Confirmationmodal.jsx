import { Box, Grid, Modal } from "@mui/material";
import React from "react"
import TypographyMD from "./Typography";
import { Close } from "@mui/icons-material";

function Confirmationmodal({ data, open, onClose, title, subtitle }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#FFFFFF',
        outline: "none",
        boxShadow: 0,
        // p: 4,
        borderRadius: 3

    };
    return (
        <>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 350, md: 450, lg: 450, xl: 450 }} height="auto" sx={style}>

                    <Box sx={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Grid container spacing={0} p={2}>
                            <Grid xs={8} md={6} align="left">
                                <TypographyMD variant='paragraph' label={title} color="#333" marginLeft={0} fontSize="18px" fontFamily="Inter" fontWeight={550} align="left" />
                            </Grid>

                            <Grid xs={4} md={6} align="right">
                                <Close onClick={onClose} sx={{ color: "#333", cursor: "pointer" }} />
                            </Grid>

                            <Grid xs={12} align="left" pt={1}>
                                <TypographyMD variant='paragraph' label={subtitle} color="#9597A6" marginLeft={0} fontSize="17px" fontWeight={400} align="left" />
                            </Grid>
                        </Grid>
                    </Box>

                    {data}

                </Box>
            </Modal>
        </>
    )
}

export default Confirmationmodal;