import { useRef } from "react";
import FilmCard from "./FilmCard";
import { getAwardHonours } from "../utils/awardHonours";

const LATEST_COUNT = 10;

function LatestFilms({ films, awards = [], programmeIds, onToggleProgramme }) {
  const containerRef = useRef(null);

  // The most recently published films, newest first.
  const latestFilms = [...films]
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, LATEST_COUNT);

  // Scroll by one visible "page" of cards in the given direction (-1 or 1),
  // wrapping to the opposite end when already at the start or end.
  const scrollFilms = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const atStart = container.scrollLeft <= 1;
    const atEnd = container.scrollLeft >= maxScroll - 1;

    if (direction > 0 && atEnd) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && atStart) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollBy({
        left: direction * container.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="latest-films" aria-labelledby="latest-films-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Now Showing</p>

          <h2 id="latest-films-heading">Latest Films</h2>
        </div>

        <p>Discover our newest films</p>
      </div>

      <div className="carousel">
        <button
          className="carousel-button previous"
          type="button"
          aria-label="Previous films"
          onClick={() => scrollFilms(-1)}
        >
          ←
        </button>

        <div className="film-container" ref={containerRef}>
          {latestFilms.map((film) => (
            <FilmCard
              key={film.id}
              id={film.id}
              isSelected={programmeIds.includes(film.id)}
              onToggleSelect={onToggleProgramme}
              title={film.title}
              genre={film.genres?.[0]}
              country={film.country}
              director={film.directors?.[0]?.name}
              year={film.year}
              description={film.synopsis}
              rating={film.rating}
              runtime={
                film.runtimeSeconds
                  ? `${Math.floor(film.runtimeSeconds / 60)} min`
                  : null
              }
              honours={getAwardHonours(film, awards)}
              image={film.poster}
              imageAlt={film.posterAlt}
              buttonText="Add to programme"
            />
          ))}
        </div>

        <button
          className="carousel-button next"
          type="button"
          aria-label="Next films"
          onClick={() => scrollFilms(1)}
        >
          →
        </button>
      </div>
    </section>
  );
}

export default LatestFilms;
