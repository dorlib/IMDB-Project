import React, {useEffect, useRef, useState} from 'react'
import classes from './search-bar.module.css'
import {gql, useQuery} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {render} from "react-dom";

function SearchBar(props) {
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

    let GET_USERS = gql`
        query Users{
            users {
                nickname
                id
            }
        }
    `

    const genres = ["action", "drama", "comedy", "crime", "animation", "fantasy", "romance", "thriller", "horror", "science fiction", "historical", "western"]
    const [placeholder, setPlaceholder] = useState("Enter Movie Name");
    const [searchBy, setSearchBy] = useState("movies");
    const [wordEntered, setWordEntered] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const {loading: loading1, error: error1, data: data1} = useQuery(GET_MOVIES)
    const {loading: loading2, error: error2, data: data2} = useQuery(GET_DIRECTORS)
    const {loading: loading3, error: error3, data: data3} = useQuery(GET_USERS)


    let menuRef = useRef()
    let menuRef1 = useRef()
    let menuRef2 = useRef()
    let menuRef3 = useRef()


    const [userId, setUserId] = useState(0);

    useEffect(() => {
        let handler = (event) => {
            if (userId !== 0) {
                if (menuRef2.current && !menuRef2.current.contains(event.target)) {
                    if (menuRef3.current && !menuRef3.current.contains(event.target)) {
                        setFilteredData([]);
                        setWordEntered("")
                    }
                }
            } else {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    if (menuRef1.current && !menuRef1.current.contains(event.target)) {
                        setFilteredData([]);
                        setWordEntered("")
                    }
                }
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    if (loading1 || loading2 || loading3) return <p>Loading...</p>;
    if (error1 || error2 || error3) return <p>Error :</p>;

    console.log(data1)
    console.log(data2)
    console.log(data3)

    let loaded

    if (searchBy === "movies") {
        loaded = (
            data1.movies.map(({title, id}) => (
                <Link to={"/moviePage/" + id} className={classes.dataItem} target={"_blank"}
                      style={{textDecoration: "none", fontSize: "large"}}> {title} </Link>
            ))
        )
    }
    if (searchBy === "directors") {
        loaded = (
            loaded = (
                data2.directors.map(({name, id}) => (
                    <Link to={"/directorPage/" + id} className={classes.dataItem} target={"_blank"}
                          style={{textDecoration: "none", fontSize: "large"}}> {name} </Link>
                )))
        )
    }
    if (searchBy === "users") {
        loaded = (
            loaded = (
                data3.users.map(({nickname, id}) => (
                    <Link to={"/userPage/" + id} className={classes.dataItem} target={"_blank"}
                          style={{textDecoration: "none", fontSize: "large"}}> {nickname} </Link>
                )))
        )
    }
    if (searchBy === "genres") {
        loaded = (
            genres.map((value) => (
                <Link to={"/moviesByGenre/" + value} className={classes.dataItem} target={"_blank"}
                      style={{textDecoration: "none", fontSize: "large"}}> {value} </Link>
            ))
        )
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("")
    }

    const HandleChange = (event) => {
        let input
        input = event.target.value
        console.log(input)
        if (input === "GET_MOVIES") {
            setSearchBy("movies")
            setPlaceholder("Enter Movie Name")
        }
        if (input === "GET_DIRECTORS") {
            setPlaceholder("Enter Director Name")
            setSearchBy("directors")
        }
        if (input === "GET_USERS") {
            setPlaceholder("Enter User Name")
            setSearchBy("users")
        }
        if (input === "GET_GENRE") {
            setSearchBy("genres")
            setPlaceholder("Enter Genre Name")
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

    if (props.userId && userId === 0) {
        setUserId(props.userId)
        console.log(userId)
    }

    console.log(userId)

    // this main navigation will be returned if user is NOT logged in
    if (!userId || userId === 0) {
        return (
            <div>
                <div className={classes.search} ref={menuRef1}>
                    <div className={classes.searchInput}>
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
                        <div className={classes.dataResult} ref={menuRef}>
                            {filteredData}
                        </div>
                    )}
                </div>
                <FormControl>
                    <RadioGroup className={classes.by} row>
                        <FormControlLabel
                            value="GET_MOVIES"
                            control={<Radio/>}
                            label="By Movie"
                            onClick={HandleChange}
                        />
                        <FormControlLabel
                            value="GET_DIRECTORS"
                            control={<Radio/>}
                            label="By Director"
                            onClick={HandleChange}
                        />
                        <FormControlLabel
                            value="GET_GENRE"
                            control={<Radio/>}
                            label="By Genre"
                            onClick={HandleChange}
                        />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    // this main search bar will be returned if user is logged in
    let logged = (
        <div>
            <div className={classes.loggedSearch} ref={menuRef2}>
                <div className={classes.loggedSearchInput}>
                    <input type={"text"} placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
                    <div className={classes.loggedSearchIcon}>
                        {wordEntered.length === 0 ? (
                            <SearchIcon/>
                        ) : (
                            <CloseIcon id={"ClearBtn"} onClick={clearInput}/>
                        )}
                    </div>
                </div>
                {filteredData.length !== 0 && (
                    <div className={classes.loggedDataResult} ref={menuRef3}>
                        {filteredData}
                    </div>
                )}
            </div>
            <FormControl>
                <RadioGroup className={classes.loggedBy} row>
                    <FormControlLabel
                        value="GET_MOVIES"
                        control={<Radio/>}
                        label="By Movie"
                        onClick={HandleChange}
                    />
                    <FormControlLabel
                        value="GET_DIRECTORS"
                        control={<Radio/>}
                        label="By Director"
                        onClick={HandleChange}
                    />
                    <FormControlLabel
                        value="GET_GENRE"
                        control={<Radio/>}
                        label="By Genre"
                        onClick={HandleChange}
                    />
                    <FormControlLabel
                        value="GET_USERS"
                        control={<Radio/>}
                        label="By User"
                        onClick={HandleChange}
                    />
                </RadioGroup>
            </FormControl>
        </div>
    )

    return logged
}

export default SearchBar