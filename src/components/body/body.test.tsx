import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Importe para estender as funções expect do Jest
import Body from "./body";

// Seu código de teste aqui

const mockMovieData = {
  Actors: "Mark Hamill, Harrison Ford, Carrie Fisher",
  Awards: "Won 6 Oscars. 67 wins & 31 nominations total",
  BoxOffice: "$460,998,507",
  Country: "United States",
  DVD: "10 Oct 2016",
  Director: "George Lucas",
  Genre: "Action, Adventure, Fantasy",
  Language: "English",
  Metascore: "90",
  Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",
  Production: "N/A",
  Rated: "PG",
  Ratings: [
    { Source: "Internet Movie Database", Value: "8.6/10" },
    { Source: "Rotten Tomatoes", Value: "93%" },
    { Source: "Metacritic", Value: "90/100" },
  ],
  Released: "25 May 1977",
  Response: "True",
  Runtime: "121 min",
  Title: "Star Wars: Episode IV - A New Hope",
  Type: "movie",
  Website: "N/A",
  Writer: "George Lucas",
  Year: "1977",
  imdbID: "tt0076759",
  imdbRating: "8.6",
  imdbVotes: "1,442,969",
};

const mockedFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockMovieData),
    headers: new Headers({ "Content-Type": "application/json" }),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "OK",
    type: "basic",
    url: "http://example.com",
  } as Response)
);

(global).fetch = mockedFetch;

beforeEach(() => {
  mockedFetch.mockClear();
});

test("renders correctly", () => {
  render(<Body />);
  expect(screen.getByText("Título")).toBeTruthy();
  expect(screen.getByText("Buscar")).toBeTruthy();
  expect(screen.getByText("Limpar")).toBeTruthy();
});

test("searches for a movie when button is clicked", async () => {
  render(<Body />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const searchButton = screen.getByText("Buscar");
  fireEvent.change(input, { target: { value: "Star Wars" } });
  fireEvent.click(searchButton);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  expect(fetch).toHaveBeenCalledWith(
    "http://www.omdbapi.com/?apikey=4c73e727&t=Star%20Wars"
  );
});

test("clears input when reset button is clicked", async () => {
  render(<Body />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const resetButton = screen.getByText("Limpar");
  fireEvent.change(input, { target: { value: "Star Wars" } });
  fireEvent.click(resetButton);
  await waitFor(() => expect(input.value).toBe(""));
});
