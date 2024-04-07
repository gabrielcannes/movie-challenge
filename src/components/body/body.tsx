import { useState } from "react";
import Button from "../button/button";
import MovieInfo from "../movieInfo/movieinfo";
import MovieProps from "../../Interfaces/movieProps";

export default function Body() {
  const apiKey: string = "4c73e727";

  const [inputValue, setInputValue] = useState("");
  const [movieResponse, setMovieResponse] = useState<MovieProps | null>(null);

  const handleSearchClick = () => {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieResponse(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleResetClick = () => {
    setInputValue("");
    setMovieResponse(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="h-full flex flex-col text-center">
      <div className="mx-auto">
        <h1 className="text-2xl my-4 font-bold">Título</h1>
        <p className="max-w-2xl mx-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
          laborum tempore autem beatae natus excepturi amet, quisquam eius cum
          voluptatum.
        </p>
      </div>
      <div className="flex flex-col my-8 mx-auto gap-5 lg:gap-10 lg:flex-row">
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          className="lg:w-80 w-full border-2 border-gray-700 p-2"
        />

        <div className="flex gap-5">
          <Button text="Buscar" onClick={handleSearchClick}></Button>
          <Button text="Limpar" onClick={handleResetClick}></Button>
        </div>
      </div>
      {movieResponse && <MovieInfo movieData={movieResponse} />}
    </div>
  );
}
