import { useState } from "react";
import Header from "./components/Header";
import LatestFilms from "./components/LatestFilms";
import AwardLegend from "./components/AwardLegend";
import FilmCollection from "./components/FilmCollection";
import Footer from "./components/Footer";

import { films } from "./data/films";
import { awards } from "./data/awards";
//import { awards } from "./data/awards";

function App() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");

  console.log("categoryFilter", categoryFilter);

  return (
    <>
      <Header />

      <main>
        <LatestFilms films={films} />
        <AwardLegend
          awards={awards}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <FilmCollection films={films} selectedFilter={selectedFilter} categoryFilter={categoryFilter} />
      </main>

      <Footer />
    </>
  );
}

export default App;
