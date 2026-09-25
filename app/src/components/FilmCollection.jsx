import FilmCard from "./FilmCard";
import { filterFilms } from "../utils/filterFilms";
import { formatRuntime, totalRuntimeMinutes } from "../utils/formatRuntime";
import { getAwardHonours } from "../utils/awardHonours";

const filmLabel = (count) => (count === 1 ? "film" : "films");

function FilmCollection({
  films,
  awards = [],
  selectedFilter,
  categoryFilters,
  programmeIds,
  onToggleProgramme,
}) {
  const filteredFilms = filterFilms(
    films,
    awards,
    selectedFilter,
    categoryFilters,
  );
  const programmeFilms = films.filter((film) => programmeIds.includes(film.id));

  const shownMinutes = totalRuntimeMinutes(filteredFilms);
  const programmeMinutes = totalRuntimeMinutes(programmeFilms);
  const meetsTarget = programmeMinutes >= 30 && programmeMinutes <= 45;

  return (
    <section aria-labelledby="films-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your films</p>

          <h2 id="films-heading">Chosen films</h2>
          <p>
            {filteredFilms.length} {filmLabel(filteredFilms.length)} shown ·
            Combined runtime: {formatRuntime(shownMinutes)}
          </p>
          <p>
            Your programme: {programmeFilms.length}{" "}
            {filmLabel(programmeFilms.length)} selected · Combined runtime:{" "}
            {formatRuntime(programmeMinutes)}
          </p>
        </div>

        {meetsTarget && "The combined runtime fits the 30–45 minute target."}
      </div>

      {filteredFilms.length === 0 && <p>No films match these filters.</p>}

      <div className="film-grid">
        {filteredFilms.map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            isSelected={programmeIds.includes(film.id)}
            onToggleSelect={onToggleProgramme}
            title={film.title}
            genre={film.genres?.[0] || "Genre not recorded"}
            country={film.country}
            director={film.directors?.[0]?.name || "Unknown"}
            year={film.year}
            description={film.synopsis}
            rating={film.rating || "TBC"}
            honours={getAwardHonours(film, awards)}
            image={film.poster}
            imageAlt={film.posterAlt}
            runtime={
              film.runtimeSeconds
                ? `${Math.floor(film.runtimeSeconds / 60)} min`
                : null
            }
            buttonText="Add to programme"
          />
        ))}
      </div>
    </section>
  );
}
export default FilmCollection;
