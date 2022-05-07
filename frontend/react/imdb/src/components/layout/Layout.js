import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import SearchBar from "./search-bar";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import React, {useState} from "react";

function Layout(props) {

    const [searchBy, setSearchBy] = useState("GET_MOVIES");

    const handleChange = (event) => {
        const searchBy = event.target.value
        setSearchBy(searchBy);
        console.log(searchBy)
    }

    return (
        <div>
            <div>
                <MainNavigation/>
                <SearchBar placeholder={"Enter Movie Name"} searchBy={searchBy}/>
                <main className={classes.main}>{props.children}</main>
            </div>
            <div>
                <FormControl>
                    <RadioGroup className={classes.by} row>
                        <FormControlLabel
                            value="GET_MOVIES"
                            control={<Radio />}
                            label="By Movie"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            value="GET_DIRECTORS"
                            control={<Radio />}
                            label="By Director"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            value="GET_GENRE"
                            control={<Radio />}
                            label="By Genre"
                            onChange={handleChange}
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
}

export default Layout;
