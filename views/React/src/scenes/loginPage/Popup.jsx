import React from "react";
import { 
    Dialog,
    Button,
    IconButton,
    TextField,
    Typography,
    useTheme, 
    DialogTitle,
    DialogContent
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Box } from "@mui/system";

export default function Popup() {
    
    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Click to open pop up
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Email Verification
                </DialogTitle>
                <DialogContent>
                    BLA BLA BLA BLA
                </DialogContent>
            </Dialog>
        </Box>
    )
}

