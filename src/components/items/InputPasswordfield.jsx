import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

function InputPasswordfield({ autoFocus, icon, type, placeholder, label, value, onChngeterm, error, helperText, disabled }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    return (
        <>
            <FormControl variant="standard" fullWidth>
                <TextField
                    InputLabelProps={{
                        style: {
                            color: isFocused ? 'gray' : 'gray',
                            fontSize: "15px"
                        },
                    }}
                    sx={{
                        borderRadius: "10px",
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: isFocused ? '3px solid gray' : '3px solid #BEBEBE',
                            },
                            '&:hover fieldset': {
                                border: '3px solid #BEBEBE',
                            },
                            '&.Mui-focused fieldset': {
                                border: '3px solid gray',
                            },
                        },
                    }}
                    onFocus={handleFocus}

                    style={{ borderRadius: "100px", height: '45px', width: '100%' }}
                    // placeholder={label}
                    autoFocus={autoFocus}
                    value={value}
                    type={showPassword ? 'text' : 'password'}
                    disabled={disabled}
                    onChange={onChngeterm}
                    startAdornment={<InputAdornment position="start" >{icon}</InputAdornment>}
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
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff sx={{ fontSize: "20px", color: "#C4B1AB" }} /> : <Visibility sx={{ fontSize: "20px", color: "#C4B1AB" }} />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={error}
                    placeholder={placeholder}
                />
                <FormHelperText style={{ height: "10px", marginTop: "2vh", color: 'red' }}>
                    {helperText}
                </FormHelperText>
            </FormControl>
        </>
    )
}

export default InputPasswordfield;