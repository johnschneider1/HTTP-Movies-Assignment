import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieUpdate = props => {
  console.log("movie form:", props);

  const initialItem = {
    id: null,
    title: "",
    director: "",
    metascore: null,
    stars: []
  };

  const [movie, setMovie] = useState(initialItem);

  useEffect(() => {
    const id = props.match.params.id;
    const currentMovie = props.movies.find(movie => `${movie.id}` === id);
    if (currentMovie) setMovie(currentMovie);
  }, [props.movies, props.match.params.id]);

  const changeHandler = e => {
    e.preventDefault();
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("put response", res);
        setMovie(res.data);
        props.history.push("/");
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>UPDATE DA MOVIE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.stars}
        />
      </form>
    </div>
  );
};

export default MovieUpdate;
