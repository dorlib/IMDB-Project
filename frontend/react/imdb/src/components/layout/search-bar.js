import React, {useState} from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({placeholder, searchBy}) {
    const GET_DIRECTORS = gql`
        query Directors {
            directors {
                name
                id
            }
        }
    `;

    const GET_MOVIES = gql`
        query Movies{
            movies {
                id
                title

            }
        }
    `;

    const GET_GENRE = gql`
        query MoviesByGenre{
            moviesByGenre {
                title
            }
        }
    `;

    let QUERY
    if (searchBy === "GET_MOVIES") {
        QUERY = GET_MOVIES
    } else if (searchBy === "GET_DIRECTORS") {
        QUERY = GET_DIRECTORS
    } else {
        QUERY = GET_GENRE
    }

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const {loading, error, data} = useQuery(QUERY)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let loaded = data.movies.map(({title, id}) => (
        <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"}
              style={{textDecoration: "none", fontSize: "large"}}> {title} </Link>
    ))

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