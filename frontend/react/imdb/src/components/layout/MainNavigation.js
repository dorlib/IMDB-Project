import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FavoritesContext from "../../favorites/favorites-context";

import * as React from "react";
import Grid from "@mui/material/Grid";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state';

import classes from "./MainNavigation.module.css";
import SearchBar from "./search-bar";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";

const grid = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
};

classes.sign = undefined;

function MainNavigation(props) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const favoritesCtx = useContext(FavoritesContext);

    const [searchBy, setSearchBy] = useState("GET_MOVIES");
    const [username, setUsername] = useState('Guest');
    const [sure, setSure] = useState(false);
    const [insert, setInsert] = useState(false);
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState(0);


    const HandleChange = (event) => {
        let input
        input = event.target.value
        console.log(input)
        setSearchBy(input);
    }

    const ProfileHandler = (event) => {
        if (props.id !== 0) {
            window.location.replace("/userPage/" + JSON.stringify(props.id))
        }
    }

    if (props.firstname !== "Guest" && username === 'Guest') {
        setUsername(props.firstname)
        setUserId(props.id)
    }

    const logoutHandler = async () => {
        await fetch('http://localhost:8081/logout', {
            method: 'post',
            credentials: 'include',
            headers: {"Content-Type": "application/json"},
        })
            .then(() => {
                setUsername('Guest')
                window.location.replace("/")
            })
            .catch((err) => {
                console.error('error:', err)
            })
    }

    const SureInsertHandler = () => {
        setSure(true);
    }

    const insertHandler = async () => {
        setLoading(true)
            await fetch('http://localhost:8081/insert', {
                method: 'post',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            })
                .then(() => {
                    setInsert(false)
                    setSure(false)
                    window.location.replace("/")
                })
                .catch((err) => {
                    console.error('error:', err)
                })
    }

    // this main navigation will be returned if user is NOT logged in
    if (username === '' || username === 'Guest') {
        return (
            <div>
                <Grid container spacing={12}>
                    <Grid item {...grid}>
                        <header className={classes.header}>
                            <Link to={"/"}>
                                <div className={classes.logo}>IMDB - Movies</div>
                            </Link>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/new-movie">Add New Movie</Link>
                                    </li>
                                    <li>
                                        <Link to="/favorites">
                                            My Favorites
                                            <span className={classes.badge}>
                      {props.sumOfFavorites}
                    </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register-sign-in">Sign In \ Log In</Link>
                                    </li>
                                    <li>
                                        <Container maxWidth="xl">
                                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                    <Avatar alt="Remy Sharp"
                                                            src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                                                            style={{width: "1.5cm", height: "1.5cm"}}/>
                                                    <div style={{
                                                        fontSize: "large",
                                                        color: "#fcb8d2"
                                                    }}>&nbsp;&nbsp;Hi,&nbsp;&nbsp;
                                                        {username}&nbsp;!
                                                    </div>
                                                </IconButton>
                                        </Container>
                                    </li>
                                </ul>
                            </nav>
                        </header>
                        <div>
                            <SearchBar userId={userId}/>
                        </div>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Button className={classes.menu} variant="contained" {...bindTrigger(popupState)}
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                bottom: "50%",
                                                left: "44.8%",
                                                color: "white",
                                                backgroundColor: "#cc2062",
                                                borderRadius: "12px",
                                                width: "3cm",
                                                height: "1.2cm"
                                            }}>
                                        Menu
                                    </Button>
                                    <Menu {...bindMenu(popupState)} style={{top: "0.2cm", width: "10rem", boxShadow: "5px 10px 20px rgba(0,0,0,0.5)"}}>
                                        <MenuItem ><Link to={"/movies"}
                                                                                               style={{textDecoration: "none"}}>All
                                            Movies</Link></MenuItem>
                                        <MenuItem ><Link to={"/directors"}
                                                                                               style={{textDecoration: "none"}}>All
                                            Directors</Link></MenuItem>
                                        <MenuItem ><Link to={"/top10"}
                                                                                               style={{textDecoration: "none"}}>Top
                                            10</Link></MenuItem>
                                    </Menu>
                                </React.Fragment>
                            )}
                        </PopupState>
                    </Grid>
                </Grid>
            </div>
        );
    }

    let sureload = (
        <CardContent className={classes.about}>
        <Typography className={classes.textSure}>
            Are you sure you want to insert pre-made data ? this cannot be undone!
        </Typography>
            {insert? null: <Button className={classes.yes} onClick={insertHandler}>{loading? "Loading..." : "Yes"}</Button>}
            {insert? null: <Button className={classes.no} onClick={() => setSure(false)}>{loading? null: "No"}</Button>}
    </CardContent>
    )

    // this main navigation will be returned if user is logged in
    let loaded =  (
            <Grid container spacing={12}>
                <Grid item {...grid}>
                    <header className={classes.header}>
                        <Link to={"/"}>
                            <div className={classes.logo}>IMDB - Movies</div>
                        </Link>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/new-movie">Add New Movie</Link>
                                </li>
                                <li style={{marginLeft: "3.5rem"}}>
                                    <Link to="/favorites">
                                        My Favorites
                                        <span className={classes.badge}>
                      {props.sumOfFavorites}
                    </span>
                                    </Link>
                                </li>
                                <li>
                                    <Container maxWidth="xl">
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                <img
                                                        src={props.profile}
                                                        style={{width: "4.5rem", height: "4.5rem", borderRadius: "200px", marginLeft: "-0.3rem"}}/>
                                                <div style={{
                                                    fontSize: "large",
                                                    color: "#fcb8d2"
                                                }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hi,&nbsp;&nbsp;
                                                    {username}&nbsp;!
                                                </div>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{mt: "45px", top: "2rem", left: "1.3rem"}}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right"
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center"
                                                            onClick={ProfileHandler}>Profile</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Account</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Dashboard</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center"
                                                            onClick={SureInsertHandler}>insert data</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center"
                                                            onClick={logoutHandler}>Logout</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Container>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div>
                        <SearchBar userId={userId}/>
                    </div>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button className={classes.menu} variant="contained" {...bindTrigger(popupState)}
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            marginLeft: "9rem",
                                            bottom: "50%",
                                            left: "44.8%",
                                            color: "white",
                                            backgroundColor: "#cc2062",
                                            borderRadius: "12px",
                                            width: "7rem",
                                            height: "2.8rem"
                                        }}>
                                    Menu
                                </Button>
                                <Menu {...bindMenu(popupState)} style={{top: "0.2cm", width: "10rem", boxShadow: "5px 10px 20px rgba(0,0,0,0.5)"}}>
                                    <MenuItem><Link to={"/movies"}
                                                                                           style={{textDecoration: "none"}}>All
                                        Movies</Link></MenuItem>
                                    <MenuItem ><Link to={"/directors"}
                                                                                           style={{textDecoration: "none"}}>All
                                        Directors</Link></MenuItem>
                                    <MenuItem ><Link to={"/top10"}
                                                                                           style={{textDecoration: "none"}}>Top
                                        10</Link></MenuItem>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </Grid>
                {/*this makes the background darker when popup appear*/}
                {sure? <div className={classes.pageMask}>&ensp;</div> : null}
            </Grid>
    );

    return <>{loaded}{sure? sureload : null}</>
}

export default MainNavigation;