import FilmCard from "./FilmCard";

function FilmCollection({ films, selectedFilter }) {
  const filteredFilms = films.filter((film) => {
    if (selectedFilter === "all") {
      return true;
    }

    return film.awards.some((award) => award.result === selectedFilter);
  });

  //console.log("filtered", filteredFilms);

  return (
    <section aria-labelledby="films-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Stage 1 Archive</p>

          <h2 id="films-heading">Choose from six short films</h2>
        </div>

        <p>Target running time: 30–45 minutes</p>
      </div>

      <div className="film-grid">
        {filteredFilms.map((film) => (
          <FilmCard
            key={film.id}
            title={film.title}
            genre={film.genre}
            country={film.country}
            year={film.year}
            description={film.description}
            rating={film.rating}
            awards={film.awards}
            buttonText="Add to programme"
          />
        ))}
      </div>
    </section>
  );
}

export default FilmCollection;
