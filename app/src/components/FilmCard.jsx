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

// function AwardCard({
//   awardName,
//   description,
//   category,
//   awardsType,
//   onClick,
// }) {
//   return (
//     <article className="award-card">
//       onClick={onClick}
//       <p className="award-meta">
//         {category} · {awardsType}
//       </p>

//       <h3>{awardName}</h3>

//       <p>{description}</p>

//     </article>
//   );
// }

// export{ AwardCard};
