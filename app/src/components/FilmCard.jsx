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

      <p>{description}</p>
      <p>Director: {director || "Unknown"}</p>

      <p>
        Age rating: {rating || "TBC"}
      </p>

      <p>Runtime: {runtime || "Runtime not recorded"}</p>
      <button type="button" onClick={() => onToggleSelect(id)}>
        {isSelected ? "Remove from programme" : "Add to programme"}
      </button>
    </article>
  );
}

export default FilmCard;
