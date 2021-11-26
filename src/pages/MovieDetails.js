import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Favourite } from "../components/movieList";

const MovieDetails = () => {
  const [movieData, setMovieData] = useState({});
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.slice(7, location.length);
    const config = {
      url: `https://www.omdbapi.com/?i=${id}&apikey=b41184fd`,
      method: "get",
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        setMovieData(response.data);
        setShow(true);
        console.log(movieData);
      })
      .catch((error) => {
        console.log(error);
        cogoToast.error("Error loading data!", {
          position: "bottom-left",
        });
      });
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="flex px-4 py-3 justify-between items-center">
          <div className="heading text-white text-semibold text-3xl">
            <div className="flex gap-4 items-center">
              <Link to="/">
                <div className="flex gap-2 items-center">
                  <h1 className="text-red-800 hidden md:block">MovieGoons</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-red-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
              </Link>
              <div className="paths">
                <Link to="/favourites">
                  <h1 className="text-lg text-gray-700">Favourites</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {show ? (
        <div className="mx-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-left text-white text-5xl">
                {movieData.Title}
              </h1>
              <div className="flex gap-4 text-gray-700 text-lg mt-2">
                <h1>{movieData.Year}</h1>

                <h1>{movieData.Runtime}</h1>
              </div>
            </div>
            <div>
              <div className="flex gap-5">
                <div>
                  <p className="text-gray-400 text-sm">IMDB Ratings</p>
                  <p className="text-gray-400 mt-2 text-lg">
                    <strong className="text-white">
                      {movieData.imdbRating}
                    </strong>{" "}
                    /10
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Your Rating</p>
                  <Favourite
                    id={movieData.imdbID}
                    title={movieData.Title}
                    image={movieData.Poster}
                    year={movieData.Year}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="md:grid grid-cols-2">
              <div className="flex justify-center md:justify-start">
                <img
                  className="w-3/5 h-auto object-center object-cover"
                  src={movieData.Poster}
                  alt={movieData.Type}
                />
              </div>
              <div>

                <div className="plot">
                    <h1 className="text-white text-left text-lg mt-5">{movieData.Plot}</h1>
                </div>

                <hr className="my-5" />

                <div className="genre">
                    <h1 className="text-left">Genre: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Genre}</spam></h1>
                </div>

                <hr className="my-5" />

                <div className="director">
                    <h1 className="text-left">Director: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Director}</spam></h1>
                </div>

                <hr className="my-5" />

                <div className="writers">
                    <h1 className="text-left">Writers: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Writer}</spam></h1>
                </div>

                <hr className="my-5" />

                <div className="released">
                    <h1 className="text-left">Released: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Released}</spam></h1>
                </div>

                <hr className="my-5" />

                <div className="awards">
                    <h1 className="text-left">Awards: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Awards}</spam></h1>
                </div>

                <hr className="my-5" />

                <div className="language">
                    <h1 className="text-left">Language: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Language}</spam></h1>
                </div>

                <hr className="my-5" />

                <div className="country">
                    <h1 className="text-left">Country: &nbsp;&nbsp;&nbsp;<spam className="text-blue-500">{movieData.Country}</spam></h1>
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieDetails;
