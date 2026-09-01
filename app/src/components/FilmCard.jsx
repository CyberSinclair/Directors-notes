function FilmCard({
  title,
  genre,
  country,
  year,
  description,
  rating,
  runtime,
  image,
  imageAlt,
  awards = [],
  buttonText = "Add to programme",
}) {
  return (
    <article className="film-card">
      {image && <img src={image} alt={imageAlt || `Poster for ${title}`} />}

      <p className="film-meta">
        {genre} · {country} · {year}
      </p>

      <h3>{title}</h3>

      <p>{description}</p>

      <p>
        Age rating: {rating}
        {runtime && ` · ${runtime}`}
      </p>

      <button type="button">{buttonText}</button>
    </article>
  );
}

export default FilmCard;
