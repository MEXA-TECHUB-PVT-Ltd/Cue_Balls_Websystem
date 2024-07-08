import { FormControl, FormHelperText, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

function InputfieldCom({ icon, type, label, value, placeholder, multiline, rows, onChngeterm, error, helperText, disabled, autoFocus }) {

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
                            color: isFocused ? 'gray' : 'gray',
                            fontSize: "14px",
                            fontWeight: "bold",
                            borderRadius: "10px",
                            backgroundColor: "transparent"
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
                                border: isFocused ? '3px solid #BEBEBE' : '3px solid #BEBEBE'
                            },
                            '&:hover fieldset': {
                                border: '3px solid #F5BC01'
                            },
                            '&.Mui-focused fieldset': {
                                border: '3px solid #F5BC01'
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

export default InputfieldCom;