import { useEffect, useState } from "react";
import Header from "./components/Header";
import LatestFilms from "./components/LatestFilms";
import AwardLegend from "./components/AwardLegend";
import FilmCollection from "./components/FilmCollection";
import Footer from "./components/Footer";

import { films } from "./data/films";
import { awards } from "./data/awards";

const PROGRAMME_STORAGE_KEY = "programmeIds";

// Programme saved from a previous visit; storage can be unavailable or hold bad data.
function loadProgramme() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRAMME_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function App() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  // Award names currently selected as category filters ([] = all categories).
  const [categoryFilters, setCategoryFilters] = useState([]);
  // Ids of films the user has added to their programme.
  const [programmeIds, setProgrammeIds] = useState(loadProgramme);

  // Save the programme whenever it changes so it survives a page refresh.
  useEffect(() => {
    try {
      localStorage.setItem(PROGRAMME_STORAGE_KEY, JSON.stringify(programmeIds));
    } catch {
      // Storage unavailable (e.g. private browsing); the programme just won't persist.
    }
  }, [programmeIds]);

  const toggleCategory = (awardName) => {
    setCategoryFilters((current) =>
      current.includes(awardName)
        ? current.filter((name) => name !== awardName)
        : [...current, awardName],
    );
  };

  const toggleProgramme = (filmId) => {
    setProgrammeIds((current) =>
      current.includes(filmId)
        ? current.filter((id) => id !== filmId)
        : [...current, filmId],
    );
  };

  return (
    <>
      <Header />

      <main>
        <LatestFilms
          films={films}
          awards={awards}
          programmeIds={programmeIds}
          onToggleProgramme={toggleProgramme}
        />
        <AwardLegend
          awards={awards}
          categoryFilters={categoryFilters}
          onToggleCategory={toggleCategory}
          onClearCategories={() => setCategoryFilters([])}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <FilmCollection
          films={films}
          awards={awards}
          selectedFilter={selectedFilter}
          categoryFilters={categoryFilters}
          programmeIds={programmeIds}
          onToggleProgramme={toggleProgramme}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;
