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
    const [insert, setInsert] = useState(true)
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

    const insertHandler = async () => {
        if (insert) {
            await fetch('http://localhost:8081/insert', {
                method: 'post',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
            })
                .then(() => {
                    setInsert(false)
                    window.location.replace("/")
                })
                .catch((err) => {
                    console.error('error:', err)
                })
        }
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
                      {favoritesCtx.totalFavorites}
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
                                    <Menu {...bindMenu(popupState)} style={{top: "0.2cm", width: "9cm"}}>
                                        <MenuItem style={{backgroundColor: "lightblue"}}><Link to={"/movies"}
                                                                                               style={{textDecoration: "none"}}>All
                                            Movies</Link></MenuItem>
                                        <MenuItem style={{backgroundColor: "lightblue"}}><Link to={"/directors"}
                                                                                               style={{textDecoration: "none"}}>All
                                            Directors</Link></MenuItem>
                                        <MenuItem style={{backgroundColor: "lightblue"}}><Link to={"/top10"}
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

    // this main navigation will be returned if user is logged in
    let loaded =  (
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
                                <li style={{marginLeft: "1.8cm"}}>
                                    <Link to="/favorites">
                                        My Favorites
                                        <span className={classes.badge}>
                      {favoritesCtx.totalFavorites}
                    </span>
                                    </Link>
                                </li>
                                <li>
                                    <Container maxWidth="xl">
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                <img
                                                        src={props.profile}
                                                        style={{width: "2.1cm", height: "2.1cm", borderRadius: "200px", marginLeft: "-0.3cm"}}/>
                                                <div style={{
                                                    fontSize: "large",
                                                    color: "#fcb8d2"
                                                }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hi,&nbsp;&nbsp;
                                                    {username}&nbsp;!
                                                </div>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{mt: "45px", top: "0.4cm"}}
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
                                                            onClick={insertHandler}>insert data</Typography>
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
                                            marginLeft: "3.7cm",
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
                                <Menu {...bindMenu(popupState)} style={{top: "0.2cm", width: "9cm"}}>
                                    <MenuItem style={{backgroundColor: "lightblue"}}><Link to={"/movies"}
                                                                                           style={{textDecoration: "none"}}>All
                                        Movies</Link></MenuItem>
                                    <MenuItem style={{backgroundColor: "lightblue"}}><Link to={"/directors"}
                                                                                           style={{textDecoration: "none"}}>All
                                        Directors</Link></MenuItem>
                                    <MenuItem style={{backgroundColor: "lightblue"}}><Link to={"/top10"}
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

    return loaded
}

export default MainNavigation;