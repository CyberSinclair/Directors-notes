import { useEffect, useState } from "react";
import Header from "./components/Header";
import LatestFilms from "./components/LatestFilms";
import AwardLegend from "./components/AwardLegend";
import FilmCollection from "./components/FilmCollection";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";

import { films } from "./data/films";
import { awards } from "./data/awards";
import { loadProgramme, saveProgramme } from "./utils/programmeStorage";
import { useHashRoute } from "./utils/useHashRoute";

const pages = {
  "/privacy-policy": PrivacyPolicy,
  "/cookie-policy": CookiePolicy,
};

function App() {
  const path = useHashRoute();
  const Page = pages[path];

  const [selectedFilter, setSelectedFilter] = useState("all");
  // Award names currently selected as category filters ([] = all categories).
  const [categoryFilters, setCategoryFilters] = useState([]);
  // Ids of films the user has added to their programme.
  const [programmeIds, setProgrammeIds] = useState(loadProgramme);

  // Save the programme whenever it changes so it survives a page refresh.
  useEffect(() => {
    saveProgramme(programmeIds);
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
        {Page ? (
          <Page />
        ) : (
          <>
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
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
