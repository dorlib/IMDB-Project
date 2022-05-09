import React, {useState} from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

function SearchBar() {
    let GET_DIRECTORS = gql`
        query Directors{
            directors {
                name
                id
            }
        }
    `;

    let GET_MOVIES = gql`
        query Movies{
            movies {
                id
                title
            }
        }
    `;
    const genres = ["action", "drama", "comedy", "crime", "animation", "fantasy", "romance", "thriller", "horror", "science fiction", "historical", "western"]
    const {loading: loading1, error: error1, data: data1} = useQuery(GET_MOVIES)
    const {loading :loading2, error: error2, data: data2} = useQuery(GET_DIRECTORS)
    const [placeholder, setPlaceholder] = useState("Enter Movie Name")
    let initLoaded = data1.movies.map(({title, id}) => (
        <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"}
              style={{textDecoration: "none", fontSize: "large"}}> {title} </Link>
    ))

    const [loaded, setLoaded] = useState(initLoaded)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");


    if (loading1 || loading2) return <p>Loading...</p>;
    if (error1 || error2) return <p>Error :</p>;

    console.log(data1)
    console.log(data2)

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("")
    }

    const HandleChange = (event) => {
        let input
        input = event.target.value
        console.log(input)
        if (input === "GET_MOVIES"){
            setPlaceholder("Enter Movie Name")
            setLoaded(data1.movies.map(({title, id}) => (
                <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"}
                      style={{textDecoration: "none", fontSize: "large"}}> {title} </Link>
            )))
        }
        if (input === "GET_DIRECTORS") {
            setPlaceholder("Enter Director Name")
            setLoaded(data2.directors.map(({name, id}) => (
                <Link to={"/directorPage/" + id} className={classes.dataItem} target={"_blank"}
                      style={{textDecoration: "none", fontSize: "large"}}> {name} </Link>
            )))
        }
        if (input === "GET_GENRE") {
            setPlaceholder("Enter Genre Name")
            loaded = data2.directors.map(({name, id}) => (
                <Link to={"/moviesByGenre/" + id} className={classes.dataItem} target={"_blank"}
                      style={{textDecoration: "none", fontSize: "large"}}> {name} </Link>
            ))
        }
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord);
        const newFilter = loaded.filter((value) => {
            let res = value["props"]["children"][1].toLowerCase().includes(searchWord.toLowerCase());
            return res
        });
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchInputs}>
                    <input type={"text"} placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
                    <div className={classes.searchIcon}>
                        {wordEntered.length === 0 ? (
                            <SearchIcon/>
                        ) : (
                            <CloseIcon id={"ClearBtn"} onClick={clearInput}/>
                        )}
                    </div>
                </div>
                {filteredData.length !== 0 && (
                    <div className={classes.dataResult}>
                        {filteredData}
                    </div>
                )}
            </div>
            <FormControl>
                <RadioGroup className={classes.by} row>
                    <FormControlLabel
                        value="GET_MOVIES"
                        control={<Radio />}
                        label="By Movie"
                        onClick={HandleChange}
                    />
                    <FormControlLabel
                        value="GET_DIRECTORS"
                        control={<Radio />}
                        label="By Director"
                        onClick = {HandleChange}
                    />
                    <FormControlLabel
                        value="GET_GENRE"
                        control={<Radio />}
                        label="By Genre"
                        onClick={HandleChange}
                    />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default SearchBar