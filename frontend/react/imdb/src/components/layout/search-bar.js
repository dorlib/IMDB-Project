import React from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";

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

    const { loading, error, data } = useQuery(GET_MOVIES)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    let loaded




    return (
        <div className={classes.search}>
            <div className={classes.searchInputs}>
                <input type={"text"} placeholder={placeholder}/>
                <div className={classes.searchIcon}><SearchIcon/></div>
            </div>
            <div className={classes.dataResult}></div>
        </div>
    )
}

export default SearchBar