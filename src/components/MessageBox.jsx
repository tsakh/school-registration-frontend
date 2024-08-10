import React from 'react';
import { Dialog, DialogActions, DialogContent, Button, Typography } from '@mui/material';
import {messageBoxButtonStyle,messageBoxTextStyle} from  '../styles';
export default function MessageBox  ({ open, onClose, message }) {
    return (
        <Dialog open={open} onClose={onClose}>
            
            <DialogContent>
                <Typography sx={messageBoxTextStyle}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} style={messageBoxButtonStyle}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};


