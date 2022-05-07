import React, {useState} from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({placeholder}) {
    const GET_DIRECTORS = gql`
        query Directors {
            directors {
                name
                profileImage
                id
                movies {
                    title
                    id
                }
            }
        }
    `;

    const GET_MOVIES = gql`
        query Movies{
            movies {
                rank
                id
                title
                image
                description
                director {
                    name
                }
            }
        }
    `;

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEnterd] = useState("");

    const {loading, error, data} = useQuery(GET_MOVIES)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let loaded = data.movies.map(({title, id}) => (
        <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"} style={{textDecoration: "none", fontSize: "large"}}> {title} </Link>
    ))

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEnterd(searchWord);
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
        setWordEnterd("")
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchInputs}>
                <input type={"text"} placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
                <div className={classes.searchIcon}>
                    {wordEntered.length === 0 ? (
                        <SearchIcon/>
                    ) :  (
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
    )
}

export default SearchBar