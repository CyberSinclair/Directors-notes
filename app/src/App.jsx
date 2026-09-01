import { useState } from "react";
import Header from "./components/Header";
import LatestFilms from "./components/LatestFilms";
import AwardLegend from "./components/AwardLegend";
import FilmCollection from "./components/FilmCollection";
import Footer from "./components/Footer";

function App() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <>
      <Header />

      <main>
        <LatestFilms />
        <AwardLegend
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <FilmCollection selectedFilter={selectedFilter} />
      </main>

      <Footer />
    </>
  );
}

export default App;
