import React from 'react'
import './home.css'
import Movie from '../movie/movie'
import { useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { movieID } from '../../redux/actions/movieIDActions'
import { countryCode } from '../../redux/actions/countryCodeActions'


function Home(){

    const movieId = useSelector(state => state.movieID.movieID)
    const cCode = useSelector(state => state.countryCode.countryCode)

    const dispatch = useDispatch()

    const [search, setSearch] = useState(false);
    const [results, setResults] = useState([]);
    //const [movieId, setMovieId] = useState();
    //const [countryCode, setCountryCode] = useState();
    var options = '';

    useEffect(() => {
      axios.get("/api/ip")
      .then((res) => {
        //setCountryCode(res.data)
        dispatch(countryCode(res.data))
    })
    //setCountryCode("CA");
    //dispatch(countryCode("CA"))
    }, [])

    useEffect(() => {
        filterData(results)
    })

    function searchMovie(e){
        const searchedItem = e.target.value;
        if(e.key === " "){
            axios.get(`/api/movie/?name=${searchedItem}`)
            .then((res) => {
                setResults(res.data);  
              })
        }else 
        if(e.key === "Enter"){
            axios.get(`/api/movie/?name=${searchedItem}`)
            .then((res) => {
              //setMovieId(res.data[0].id)
              dispatch(movieID(res.data[0].id))
              setSearch(true);  
              })
        }
    }

    function filterData(data){
        if(data.length < 5){
            for (var i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].title + '"' + ' id="' + data[i].id + '" />';
              }
        } else if(data.length == 0){
            options += '<option value="No Movie Found" />';
        }
        else{
            for (var i = 0; i < 5; i++) {
                options += '<option value="' + data[i].title + '"' + ' id="' + data[i].id + '" />';
              }
        }
        document.getElementById('suggestions').innerHTML = options;
    }

    function displayMovie(){
        var val = document.getElementById("searchMovie").value;
        var opts = document.getElementById('suggestions').childNodes;
        for (var i = 0; i < opts.length; i++) {
          if (opts[i].value === val) {
            setSearch(true);
            //setMovieId(opts[i].id)
            dispatch(movieID(opts[i].id))
            break;
          }
        }
    }

    return(
        <div className="row homeHeading">
                <div className="row firstRow">
                <h1 className="display-3">
                Stream Search
                <small className="text-muted display-4">Your one stop shop to know where your favourite movies are streaming!</small>
                </h1>
                </div>
                <div className="row searchBar ">
                <div className="input-group rounded ">
                <input type="text" className="form-control rounded searchfield" placeholder="Search your movie!" aria-label="Search"
                        aria-describedby="search-addon" 
                        id="searchMovie"
                        autocomplete="off"
                        list="suggestions"
                        onInput={displayMovie}
                        onKeyUp={(event) => {
                                 return searchMovie(event)
                        }}
                             />
                             <datalist id="suggestions">
                             </datalist>

                </div>
                </div>
                <div className="row movieCard">
                {search && <Movie id={movieId} code={cCode}/> }
                </div>
        </div>
    )
}

export default Home;