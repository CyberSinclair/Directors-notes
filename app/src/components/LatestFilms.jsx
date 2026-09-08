import FilmCard from "./FilmCard";

function LatestFilms({ films }) {
  //console.log("latest films", films);
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
        >
          ←
        </button>

        <div className="film-container">
          {films.map((film) => (
            <FilmCard
              key={film.id}
              title={film.title}
              genre={film.genre}
              country={film.country}
              year={film.year}
              description={film.description}
              rating={film.rating}
              runtime={film.runtime}
              image={film.image}
              imageAlt={film.imageAlt}
              buttonText="View film"
            />
          ))}
        </div>

        <button
          className="carousel-button next"
          type="button"
          aria-label="Next films"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default LatestFilms;
