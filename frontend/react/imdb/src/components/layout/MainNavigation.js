import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FavoritesContext from "../../store/favorites-context";

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

const grid = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
};

classes.sign = undefined;

function MainNavigation() {
    const settings = ["Profile", "Account", "Dashboard", "Logout"];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const favoritesCtx = useContext(FavoritesContext);

    const [searchBy, setSearchBy] = useState("GET_MOVIES");

    const HandleChange = (event) => {
        let input
        input = event.target.value
        console.log(input)
        setSearchBy(input);
    }

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
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                                <Avatar alt="Remy Sharp"
                                                        src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
                                                        style={{width: "1.5cm", height: "1.5cm"}}/>
                                                <div style={{fontSize: "large"}}>&nbsp;&nbsp;Hi, Guest!</div>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{mt: "45px"}}
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
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">{setting}</Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Container>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div>
                        <SearchBar/>
                    </div>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button className={classes.menu} variant="contained" {...bindTrigger(popupState)}
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            bottom: "50%",
                                            left: "44%",
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

export default MainNavigation;