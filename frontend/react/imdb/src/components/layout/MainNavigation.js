import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FavoritesContext from "../../store/favorites-context";

import * as React from "react";
import Grid from "@mui/material/Grid";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import classes from "./MainNavigation.module.css";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import SearchBar from "./search-bar";


const grid = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
};

classes.sign = undefined;

function MainNavigation() {
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
            <Link to={"/"}><div className={classes.logo}>IMDB - Movies</div></Link>
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
                <li className={classes.sign}>
                  <Link to="/new-user">Register</Link>
                </li>
                <li className={classes.sign}>
                  <Link to="/sign-in">Sign In</Link>
                </li>
              </ul>
            </nav>
          </header>
          <div>
            <SearchBar />
          </div>
          <PopupState variant="popover" popupId="demo-popup-menu"  >
            {(popupState) => (
                <React.Fragment >
                  <Button className={classes.menu} variant="contained" {...bindTrigger(popupState)} style={{position: "relative", display: "flex", bottom: "50%", left: "47%", color: "white",
                  backgroundColor: "#cc2062", borderRadius: "12px", width: "3cm", height: "1.2cm"}} >
                    Menu
                  </Button>
                  <Menu {...bindMenu(popupState)} >
                    <MenuItem><Link to={"/movies"}>All Movies</Link></MenuItem>
                    <MenuItem><Link to={"/directors"}>All Directors</Link></MenuItem>
                    <MenuItem><Link to={"/top10"}>Top 10</Link></MenuItem>
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
