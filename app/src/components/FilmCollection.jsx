import FilmCard from "./FilmCard";

//<FilmCollection films={films} selectedFilter={selectedFilter} categoryFilter={categoryFilter} />

function FilmCollection({
  films,
  selectedFilter,
  categoryFilter,
  count = 0,
  totalMinutes = 0,
}) {
  console.log("cat5egory", categoryFilter);
  console.log("selected", selectedFilter);
  const filteredFilms = films.map((film) => {
    console.log(film);
    const awardFilms = film.honours.filter(
      (award) => award.result === "Longlisted",
    );
    console.log("awardFilms", awardFilms);
    return awardFilms;
  });

  const meetsTarget = totalMinutes >= 30 && totalMinutes <= 45;
  const filmLabel = count === 1 ? "film" : "films";

  return (
    <section aria-labelledby="films-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your films</p>

          <h2 id="films-heading">Chosen films</h2>
          <p>
            {count || 0} {filmLabel} selected · Combined runtime:{" "}
            {totalMinutes || 0} min
          </p>
        </div>

        {meetsTarget
          ? "The combined runtime fits the 30–45 minute target."
          : "Aim for a combined runtime of 30–45 minutes."}
      </div>

      <div className="film-grid">
        {filteredFilms.map((film) => (
          <FilmCard
            key={film.id}
            title={film.title}
            genre={film.genres?.[0] || "Genre not recorded"}
            country={film.country}
            director={film.directors?.[0]?.name || "Unknown"}
            year={film.year}
            description={film.synopsis}
            rating={film.rating || "TBC"}
            honours={
              ["Winner", "Nominated"].includes(film.honours?.[3]?.result)
                ? [film.honours[3]]
                : []
            }
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
