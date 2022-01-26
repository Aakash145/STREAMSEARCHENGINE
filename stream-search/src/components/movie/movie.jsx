import React from 'react'
import './movie.css'
import { useEffect, useState} from 'react'
import axios from 'axios'
import $ from 'jquery'

function Movie(props){

    const [isLoading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState();
    const [streamServices, setStreamServices] = useState([]);

    const movieId = props.id
    const countryCode = props.code
    let updatedRating = 0


    //React is rendered again only when the props changes here, so that neither the useEffect is called once nor it is called infinite times.
    useEffect(() => {
      axios.get(`/api/movieId/?id=${movieId}`)
        .then((res) => {
            setMovieData(res.data)
            setLoading(false);
        })   
    }, [props.id])

    useEffect(() => {
      axios.get(`/api/stream/?id=${movieId}&code=${countryCode}`)
      .then((res) => {
        setStreamServices(res.data)
      })
    }, [props.id])

    useEffect(() => {
      $('i').addClass('active');
      while(updatedRating <= 5){
        updatedRating++
        $('.fa-star#rating-' + updatedRating).removeClass('active')
      }
      $('.fa-star#rating-' + updatedRating).removeClass('active');
    })

    if (isLoading) {
        return <i className="fas fa-spin fa-2x fa-spinner" styles="color:white"></i>;
    }

    function calculateRatings(imdbRatings){
      const newRatings =  imdbRatings/2

      if(newRatings > 0 && newRatings < 1.5){
        updatedRating =  1
      }else if(newRatings >= 1.5 && newRatings < 2.5){
        updatedRating =  2
      }else if(newRatings >= 2.5 && newRatings < 3.5){
        updatedRating =  3
      }else if(newRatings >= 3.5 && newRatings < 4.5){
        updatedRating =  4
      }else if(newRatings >= 4.5){
        updatedRating =  5
      }else{
        updatedRating =  0
      }
    }

    return(
<div className="card eachMovie" styles="width: 18rem;">
  <img
    src={"https://image.tmdb.org/t/p/original"+movieData.poster_path}
    className="card-img-top"
    alt="Chicago Skyscrapers "
  />
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{movieData.original_title.toUpperCase()}</li>
    <li className="list-group-item">{movieData.overview}</li>
    <li className="list-group-item">Runtime: {movieData.runtime} minutes</li>
    <li className="list-group-item">
    
    {calculateRatings(movieData.vote_average)}
    <div className="rating">
      <i className="fa fa-star" id="rating-1"></i>
      <i className="fa fa-star" id="rating-2"></i>
      <i className="fa fa-star" id="rating-3"></i>
      <i className="fa fa-star" id="rating-4"></i>
      <i className="fa fa-star" id="rating-5"></i>
    </div>
    </li>
    <li className="list-group-item">Available On: {streamServices.length ? streamServices.map((item) => {
      return (
        streamServices.indexOf(item) != streamServices.length -1 ?<span> &nbsp; <img src={"https://image.tmdb.org/t/p/original"+item} className="bi bi-images" alt="Chicago Skyscrapers "/> &nbsp;</span> 
        : 
        <span><img src={"https://image.tmdb.org/t/p/original"+item} className="bi bi-images" alt="Chicago Skyscrapers "/></span>
      )
    }) : <span> "Not Available on any Platform!"</span>}
      </li>
  </ul>
</div>
    )
}

export default Movie;