import { useContext } from "react";
import {Link, useNavigate} from "react-router-dom";

import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorites-context";

import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


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

  return (
    <div>
      <Grid container spacing={12}>
        <Grid item {...grid}>
          <header className={classes.header}>
            <div className={classes.logo}>IMDB - Movies</div>
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
            <div className={classes.wrap}>
              <div className={classes.search}>
                <input
                  type="text"
                  className={classes.searchTerm}
                  placeholder="What are you looking for?"
                />
                <button type="submit" className={classes.searchButton}></button>
              </div>
            </div>
          <FormControl>
            <RadioGroup className={classes.by} row>
              <FormControlLabel
                value="movie"
                control={<Radio />}
                label="By Movie"
              />
              <FormControlLabel
                value="director"
                control={<Radio />}
                label="By Director"
              />
            </RadioGroup>
          </FormControl>
          <PopupState variant="popover" popupId="demo-popup-menu" >
            {(popupState) => (
                <React.Fragment >
                  <Button variant="contained" {...bindTrigger(popupState)} className={classes.menu}>
                    Menu
                  </Button>
                  <Menu {...bindMenu(popupState)} >
                    <MenuItem><Link to={"/"}>All Movies</Link></MenuItem>
                    <MenuItem><Link to={"/directors"}>All Directors</Link></MenuItem>
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
