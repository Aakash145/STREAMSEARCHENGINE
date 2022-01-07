import React from 'react'
import './movie.css'
import { useEffect, useState} from 'react'
import axios from 'axios';

function Movie(props){

    const [isLoading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState();
    const [streamServices, setStreamServices] = useState([]);

    const movieId = props.id
    const countryCode = props.code

    useEffect(() => {
        axios.get(`/api/movieId/?id=${movieId}`)
        .then((res) => {
            setMovieData(res.data)
            setLoading(false);
        })
    }, [])

    useEffect(() => {
      axios.get(`/api/stream/?id=${movieId}&code=${countryCode}`)
      .then((res) => {
        setStreamServices(res.data)
      })
    }, [])

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return(
<div className="card eachMovie" styles="width: 18rem;">
  <img
    src={"https://image.tmdb.org/t/p/original"+movieData.poster_path}
    className="card-img-top"
    alt="Chicago Skyscrapers "
  />
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{movieData.original_title}</li>
    <li className="list-group-item">{movieData.overview}</li>
    <li className="list-group-item">Runtime: {movieData.runtime} minutes</li>
    <li className="list-group-item">IMDB Rating: {movieData.vote_average}</li>
    <li className="list-group-item">Available On: {streamServices.length ? streamServices.map((item) => {
      return (
        streamServices.indexOf(item) != streamServices.length -1 ?<span>{item + ", "}</span> : <span>{item + "."}</span>
      )
    }) : <span>"Not Available on any Platform!"</span>}
      </li>
  </ul>
</div>
    )
}

export default Movie;