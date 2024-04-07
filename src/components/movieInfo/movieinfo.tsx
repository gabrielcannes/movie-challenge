
import MovieProps from "../../Interfaces/movieProps";
import Button from "../button/button";

export default function MovieInfo({ movieData }: { movieData: MovieProps | null }) {
  const handleFavoriteButtonClick = () => {
    alert("Favorited");
  };

  if (!movieData || movieData.Response === "False") {
    return <div className="text-center">Nenhum filme com esse nome foi encontrado!</div>;
  }

  return (
    <div className="h-full my-4 flex lg:flex-row flex-col lg:gap-10 gap-8 mx-auto lg:px-10">
      <div className="flex h-full mx-auto flex-col lg:w-2/3 w-9/12 text-left gap-4">
        <h2 className="font-semibold text-2xl">{movieData.Title}</h2>
        <p>{movieData.Plot}</p>
        <div className="mx-auto flex flex-col mt-8 lg:my-4 lg:gap-0 gap-10 lg:mx-0">
          <div className="flex flex-col">
            <h3>
              <span className="font-bold">Actor: </span>
              {movieData.Actors}
            </h3>
            <h3 className="font-bold">
              <span className="font-bold">Review: {movieData.Ratings[0]?.Value}</span> 
            </h3>
          </div>
          <div className="my-auto lg:mt-6">
            <Button onClick={handleFavoriteButtonClick} text="Favorite"></Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 w-full flex">
        <div className="mx-auto lg:h-full border-2 flex">
          <img src={movieData.Poster} alt="Movie Poster" className="h-full w-full p-4" />
        </div>
      </div>
    </div>
  );
}
