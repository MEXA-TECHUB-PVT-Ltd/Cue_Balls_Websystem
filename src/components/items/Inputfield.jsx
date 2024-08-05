import { FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

function Inputfield({ icon, type, label, value, placeholder, multiline, rows, onChngeterm, error, helperText, disabled, autoFocus }) {

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    return (
        <>
            <FormControl variant="standard" fullWidth>
                <TextField
                    label={label}
                    multiline={multiline} // Use 'multiline' instead of 'multiline={multiline}'
                    rows={rows}
                    InputLabelProps={{
                        style: {
                            color: isFocused ? 'gray' : 'gray',
                            fontSize: "15px"
                        },
                    }}
                    InputProps={{
                        style: {
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "500px",
                            letterSpacing: "0.5px",
                            borderRadius: "10px",
                            backgroundColor: "#353535"
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                {icon}
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        borderRadius: "10px",
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: isFocused ? '3px solid gray' : '3px solid #BEBEBE',
                                border: "3px solid"
                            },
                            '&:hover fieldset': {
                                border: '1px solid #BEBEBE',
                                border: "3px solid"
                            },
                            '&.Mui-focused fieldset': {
                                border: '3px solid gray',
                                //  border:"3px solid"
                            },
                        },
                    }}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    value={value}
                    autoFocus={autoFocus}
                    type={type}
                    disabled={disabled}
                    onChange={onChngeterm}
                    error={error}
                />
                <FormHelperText style={{ height: "20px", marginTop: "0vh", color: 'red' }}>
                    {helperText}
                </FormHelperText>
            </FormControl>
        </>
    )
}

export default Inputfield;