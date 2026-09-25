function FilmCard({
  title,
  genre,
  country,
  year,
  director,
  description,
  rating,
  runtime,
  image,
  imageAlt,
  isSelected,
  onToggleSelect = () => {},
  id,
  honours = [],
  buttonText = "Add to programme",
}) {
  const cardClass = isSelected
    ? "film-card film-card--selected"
    : "film-card";
  return (
    <article className={cardClass}>
      {image && <img src={image} alt={imageAlt || `Poster for ${title}`} />}

      <p className="film-meta">
        {genre || "Genre not recorded"} · {country || "Country not recorded"} · {year || "Year not recorded"}

      </p>

      <h3>{title}</h3>

      {honours.length > 0 && (
        <ul className="film-awards" aria-label="Awards">
          {honours.map((honour) => (
            <li
              key={honour.bodyId}
              className={`award-badge ${honour.result === "Winner" ? "award-gold" : "award-silver"}`}
            >
              {honour.result === "Winner" ? "🏆 Winner" : "🎖 Nominated"} ·{" "}
              {honour.awardName}
            </li>
          ))}
        </ul>
      )}

      <p>{description}</p>
      <p>Director: {director || "Unknown"}</p>

      <p>
        Age rating: {rating || "TBC"}
      </p>

      <p>Runtime: {runtime || "Runtime not recorded"}</p>
      <button type="button" onClick={() => onToggleSelect(id)}>
        {isSelected ? "Remove from programme" : buttonText}
      </button>
    </article>
  );
}

export default FilmCard;
