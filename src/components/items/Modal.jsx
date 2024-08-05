import { Box, Grid, Modal } from "@mui/material";
import React from "react"
import TypographyMD from "./Typography";
import { Close } from "@mui/icons-material";
import close from "../../Assets/close.png";

function ModalAdd({ data, open, onClose, title }) {
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
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box width={{ xs: 350, md: 500, lg: 500, xl: 500 }} height="auto" sx={style}>

                <Box sx={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Grid container spacing={0} p={1}>
                        <Grid xs={6} align="left">
                            <TypographyMD variant='paragraph' label={title} color="#F5BC01" marginLeft={0} fontSize="17px" fontFamily="Rubik" fontWeight={550} align="left" />
                        </Grid>

                        <Grid xs={6} align="right">
                            <img src={close} alt="..." style={{ alignSelf: "center", width: "5vh", cursor: "pointer" }} onClick={onClose} />
                        </Grid>
                    </Grid>
                </Box>

                {data}

            </Box>
        </Modal>
    )
}

export default ModalAdd;