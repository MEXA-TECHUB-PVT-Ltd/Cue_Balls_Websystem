import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import logo from "../../Assets/logo.png";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Assessment, Category, Code, ContactPage, Dashboard, Delete, DeviceThermostat, Diversity3, Edit, Feedback, FormatAlignLeft, Games, Groups, History, Home, Interests, LocalLibrary, Lock, Logout, MergeType, Notifications, People, PeopleAlt, PriorityHigh, PrivacyTip, RecordVoiceOver, Report, Restaurant, RestaurantMenu, School, Search, Security, Settings, Subscriptions, TwoWheeler } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import "../../App.css"
import { Avatar, Button, Grid, InputAdornment, Menu, MenuItem, Modal, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import "./Sidebar.css"
import url from '../../url';
import endpoint from '../../Endpointurl';
import TypographyMD from '../items/Typography';
import ButtonMD from '../items/ButtonMD';
import Confirmationmodal from '../items/Confirmationmodal';
import ModalWarning from '../items/ModalWarning';
import alert from "../../Assets/alert.png";

const drawerWidth = 240;

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

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Sidebar({ componentData }) {
    const navigate = useNavigate();

    const [adminimage, setAdminimage] = useState("");
    const [profiledetails, setProfiledetails] = useState("");

    useEffect(() => {
        const adminimage = JSON.parse(localStorage.getItem('image'));
        if (adminimage) {
            console.log(adminimage)
            setAdminimage(adminimage);
        }

        const details = JSON.parse(localStorage.getItem('profiledetails'));
        if (details) {
            setProfiledetails(details);
        }

    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openmenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        // navigate("/profile");
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth > 620) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const logoutfunction = () => {
        const items = JSON.parse(localStorage.getItem('jwtoken'));
        console.log(items)
        if (items != null) {
            localStorage.clear("items");
            setTimeout(() => {
                navigate("/")
            }, 3000);
        } else {
            navigate("/dashboard");
        }

        setTimeout(() => {
            navigate("/")
        }, 3000);

    }

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [filterdata, setFilterdata] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth > 620) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [loading, setLoading] = useState(false);

    const [openmodallogout, setOpenmodallogout] = useState(false);
    const handleOpenmodallogout = () => {
        setOpenmodallogout(true);
    };
    const handleClosemodallogout = () => setOpenmodallogout(false);

    const logout = async () => {
        setLoading(true);
        setTimeout(() => {
            navigate(`${endpoint}`)
            setOpenmodallogout(false);
            setLoading(false);
        }, 3000);

        // const items = JSON.parse(localStorage.getItem('profiledetails'));
        // console.log(items)
        // if (items != null) {
        //     localStorage.clear("items");
        //     setTimeout(() => {
        //         navigate(`${endpoint}`)
        //     }, 3000);
        // } else {
        //     navigate(`${endpoint}dashboard`);
        // }

    }

    const [activeTab, setActiveTab] = useState(null); // State to manage active tab

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        console.log("edit profile");
    };

    const tabs = [
        { text: 'Edit profile', icon: <History sx={{ fontSize: "20px" }} /> }
    ];

    return (
        <>
            <Box sx={{ backgroundColor: "rgba(255, 230, 127,0.6)", height: "100vh", display: 'flex' }}>
                <CssBaseline />

                <Drawer variant="permanent" open={open}  >
                    {window.innerWidth < 620 ?
                        <></>
                        :
                        <>
                            <DrawerHeader sx={{ backgroundColor: "rgba(255, 230, 127,0.6)" }}>
                                <Grid container spacing={0} pt={2}>
                                    <Grid xs={12} align="center" pt={3}>
                                        <img src={logo} alt="..." style={{}} />
                                    </Grid>
                                </Grid>

                            </DrawerHeader>

                            <Grid container spacing={0} sx={{ pt: 6, pb: 2, backgroundColor: "rgba(255, 230, 127,0.6)" }}>
                                <Grid xs={12} align="center">
                                    <TypographyMD variant='paragraph' label="Cue Balls" color="#F5BC01" fontFamily="Rubik" marginLeft={1} fontSize="20px" fontWeight={500} align="center" />
                                </Grid>
                            </Grid>
                        </>
                    }
                    {/* <Divider /> */}
                    <List sx={{ backgroundColor: "rgba(255, 230, 127,0.6)", height: "100vh", pt: { xs: 5, md: 0 } }}>
                        <ul className='navbar'>
                            {[
                                { to: "dashboard", text: "Dashboard", icon: <Dashboard sx={{ fontSize: "20px" }} /> },
                                { to: "wallet", text: "Wallet", icon: <DeviceThermostat sx={{ fontSize: "20px" }} /> },
                                { to: "history", text: "History", icon: <History sx={{ fontSize: "20px" }} /> },
                                { to: "editprofile", text: "Edit Profile", icon: <Edit sx={{ fontSize: "20px" }} /> },
                                { to: "changepassword", text: "Change Password", icon: <Security sx={{ fontSize: "20px" }} />, condition: profiledetails?.data?.signup_type !== "google" },
                                { to: "contactus", text: "Contact Us", icon: <ContactPage sx={{ fontSize: "20px" }} /> },
                                { to: "privacypolicy", text: "Privacy Policy", icon: <PrivacyTip sx={{ fontSize: "20px" }} /> },
                                { to: "termsconditions", text: "Terms & Conditions", icon: <Assessment sx={{ fontSize: "20px" }} /> },
                                { to: "deleteaccount", text: "Delete Account", icon: <Delete sx={{ fontSize: "20px" }} /> },
                            ].map((item, index) => (
                                item.condition === false ? null : (
                                    <li key={item.text}>
                                        <NavLink to={`${endpoint}${item.to}`} className="navbar-link" style={{ textDecoration: 'none' }}>
                                            <ListItem disablePadding sx={{ display: 'block' }}>
                                                <ListItemButton
                                                    sx={{
                                                        minHeight: 0,
                                                        justifyContent: open ? 'initial' : 'center',
                                                        px: 2, pb: 0,
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 0,
                                                            mr: open ? 3 : 'auto',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography sx={{ fontFamily: "Rubik" }}>{item.text}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                                                </ListItemButton>
                                            </ListItem>
                                        </NavLink>
                                    </li>
                                )
                            ))}
                        </ul>
                    </List>

                    <Box sx={{ backgroundColor: "rgba(255, 230, 127,0.6)", pb: 4 }}>
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <button onClick={handleOpenmodallogout} style={{ width: "90%", backgroundColor: "#FFEA96", border: "4px solid #F5BC01", borderRadius: "10px", padding: 7 }}>
                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "10px" }}>
                                    <Logout fontSize='12px' sx={{ marginTop: "3px" }} />
                                    <Typography variant='body1' align="center" fontWeight="medium" color="#060502" fontFamily="Rubik" fontSize={{ xs: "16px", md: "16px" }} sx={{ display: { xs: "none", sm: "block", md: "block" } }}  >
                                        Logout
                                    </Typography>
                                </div>
                            </button>
                        </div>
                    </Box>

                </Drawer>

                <Box sx={{ width: { xs: "50%", md: "100%" }, flexGrow: 1 }}>
                    {/* <Dashboard /> */}
                    {componentData}
                </Box>
            </Box>

            {/* logout modal */}
            <Modal
                open={openmodallogout}
                onClose={() => setOpenmodallogout(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 450, lg: 450, xl: 450 }} height="auto" sx={styleaddsuccess}>
                    <Grid container spacing={0} p={5}>
                        <Grid xs={12} align="center">

                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                <Stack align="center" direction="column" spacing={2} >
                                    <img src={alert} alt="..." style={{ alignSelf: "center", width: "15vh" }} />

                                    <TypographyMD variant='paragraph' label="Do you want to logout?" color="#232323" fontFamily="Rubik" marginLeft={0} fontSize="20px" fontWeight={550} align="center" />

                                </Stack>
                            </div>

                        </Grid>

                        <Grid container spacing={0} pt={4}>
                            <Grid xs={6}>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                    <ButtonMD variant="contained" title="Cancel" width="90%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" onClickTerm={() => setOpenmodallogout(false)} />
                                </div>

                            </Grid>

                            <Grid xs={6}>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                    <ButtonMD variant="contained" title="Yes, sure" width="90%" type="submit" borderColor="orange" backgroundColor="orange" borderRadius="10px" disabled={loading} onClickTerm={logout} />
                                </div>

                            </Grid>
                        </Grid>

                    </Grid>

                </Box>
            </Modal>

        </>
    )
}

export default Sidebar