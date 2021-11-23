import React, { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import axios from "axios";
import cogoToast from "cogo-toast";
import MovieList, { Favourite } from "../components/movieList";
import { Routes, Route, Link } from "react-router-dom";
import Favourites from "./Favourites";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("favourites")) {
      const favourites = [];
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, []);

  // function when search button is clicked
  const onSearch = () => {
    if (searchValue !== "") {
      const config = {
        url: `http://www.omdbapi.com/?s=${searchValue}&apikey=b41184fd`,
        method: "get",
      };

      axios(config)
        .then((response) => {
          if(response.data.Search){
          console.log(response.data.Search);
          setMovies(response.data.Search);
          }
          
        })
        .catch((error) => {
          console.log(error);
          setMovies([])
          return cogoToast.error("Something went wrong!", {
            position: "bottom-left",
          });
        });
    } else {
      return cogoToast.warn("Please enter search value", {
        position: "bottom-left",
      });
    }
  };

  return (
    <div>
      <div className="navbar -mb-16">
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
          <div className="search">
            <span className="flex gap-3">
              <input
                className="outline-none border border-gray-700 bg-gray-800 px-3 py-1 rounded text-white w-full"
                placeholder="Search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button onClick={() => onSearch()}>
                <SearchIcon className="h-10 w-10 text-gray-700" />
              </button>
            </span>
          </div>
        </div>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
