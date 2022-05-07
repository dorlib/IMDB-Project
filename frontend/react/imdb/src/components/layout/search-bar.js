import React, {useState} from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';

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

    const {loading, error, data} = useQuery(GET_MOVIES)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    let loaded = filteredData.map(({title, id}) => (
        <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"}> {title} </Link>
    ))

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = loaded.filter((value) => {
            return value.title.includes(searchWord);
        })
        console.log(filteredData)
        setFilteredData(newFilter);
    }


    return (
        <div className={classes.search}>
            <div className={classes.searchInputs}>
                <input type={"text"} placeholder={placeholder} onChange={handleFilter}/>
                <div className={classes.searchIcon}><SearchIcon/></div>
            </div>
            { filteredData.length != 0 && (
                <div className={classes.dataResult}>
                    {loaded}
                </div>
            )}
        </div>
    )
}

export default SearchBar