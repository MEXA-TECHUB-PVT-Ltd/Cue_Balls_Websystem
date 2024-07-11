import { Box, Grid, Modal, Stack } from "@mui/material";
import React from "react"
import TypographyMD from "./Typography";
import { CheckCircle, Close } from "@mui/icons-material";
import success from "../../Assets/success.png";
import ButtonMD from "./ButtonMD";

function ModalSuccess({ data, open, onClose, title, subheading }) {

    const styleaddsuccess = {
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
                <Box width={{ xs: 350, md: 450, lg: 450, xl: 450 }} height="auto" sx={styleaddsuccess}>
                    <Grid container spacing={0} p={5}>
                        <Grid xs={12} align="center">

                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                <Stack align="center" direction="column" spacing={2} >
                                    <img src={success} alt="..." style={{ alignSelf: "center", width: "30vh" }} />

                                    <TypographyMD variant='paragraph' label={title} color="#232323" fontFamily="Rubik" marginLeft={0} fontSize="20px" fontWeight={550} align="center" />

                                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                        {data}
                                    </div>
                                </Stack>
                            </div>

                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </>
    )
}

export default ModalSuccess;