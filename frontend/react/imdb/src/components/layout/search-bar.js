import React, {useState} from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({placeholder, searchBy}) {
    let GET_DIRECTORS = gql`query Directors {directors {name id}}`;
    let GET_MOVIES = gql`query Movies{movies {id title}}`;
    const genres = ["action", "drama", "comedy", "crime", "animation", "fantasy", "romance", "thriller", "horror", "science fiction", "historical", "western"]

    let QUERY
    if (searchBy === "GET_DIRECTORS") {
        QUERY = GET_DIRECTORS
    }
    if (searchBy === "GET_MOVIES"){
        QUERY = GET_MOVIES
    }

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const {loading, error, data} = useQuery(QUERY)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let loaded

    if (QUERY === GET_MOVIES) {
        loaded = data.movies.map(({title, id}) => (
            <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"}
                  style={{textDecoration: "none", fontSize: "large"}}> {title} </Link>
        ))
    }
    if (QUERY === GET_DIRECTORS) {
        loaded = data.directors.map(({name, id}) => (
            <Link to={"/directorPage/" + id} className={classes.dataItem} target={"_blank"}
                  style={{textDecoration: "none", fontSize: "large"}}> {name} </Link>
        ))
    }
    if (searchBy === "GET_GENRE") {
        loaded = genres.map( (value) => (
            <Link className={classes.dataItem} target={"_blank"}
                  style={{textDecoration: "none", fontSize: "large"}}> {value} </Link>
        ))
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

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("")
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
        </div>
    )
}

export default SearchBar