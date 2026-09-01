import FilmCard from "./FilmCard";

function LatestFilms() {
  const latestFilms = [
    {
      id: 1,
      title: "The Quiet Cartographer",
      genre: "Documentary",
      country: "Ireland",
      year: 2023,
      description:
        "A mapmaker records disappearing paths along a changing coastline.",
      rating: "U",
      runtime: "1h 20m",
      image: "/images/film1.jpg",
      imageAlt: "Poster for The Quiet Cartographer",
    },

    {
      id: 2,
      title: "Borrowed Weather",
      genre: "Drama",
      country: "United Kingdom",
      year: 2024,
      description:
        "Two sisters invent a weather forecast to delay a difficult goodbye.",
      rating: "U",
      runtime: "1h 35m",
      image: "/images/film2.jpg",
      imageAlt: "Poster for Borrowed Weather",
    },

    {
      id: 3,
      title: "Soft Machines",
      genre: "Animation",
      country: "Estonia",
      year: 2022,
      description:
        "Tiny machines continue their routines after the factory falls silent.",
      rating: "U",
      runtime: "1h 40m",
      image: "/images/film3.jpg",
      imageAlt: "Poster for Soft Machines",
    },

    {
      id: 4,
      title: "A Song for the Underpass",
      genre: "Documentary",
      country: "United Kingdom",
      year: 2025,
      description:
        "Musicians transform an overlooked pedestrian tunnel for one evening.",
      rating: "U",
      runtime: "1h 15m",
      image: "/images/film4.jpg",
      imageAlt: "Poster for A Song for the Underpass",
    },

    {
      id: 5,
      title: "A Song for Avengers new start",
      genre: "Action",
      country: "Japan",
      year: 2020,
      description: "Evil attacks, good strikes back!",
      rating: "12A",
      runtime: "2h 15m",
      image: "/images/film5.jpg",
      imageAlt: "Avengers new start",
    },

    {
      id: 6,
      title: "A Song for the Man-bat",
      genre: "Documentary",
      country: "United Kingdom",
      year: 2025,
      description: "A bat is bitten by a radioactive man, he becomes Man-bat!",
      rating: "15",
      runtime: "1h 30m",
      image: "/images/film6.jpg",
      imageAlt: "Man-bat",
    },

    {
      id: 7,
      title: "A Song for the man-spider",
      genre: "Documentary",
      country: "United Kingdom",
      year: 2025,
      description: "A spider dresses up as a man to fight supervillain flies.",
      rating: "U",
      runtime: "3h 15m",
      image: "/images/film7.jpg",
      imageAlt: "Poster for man-spider",
    },
  ];

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
          {latestFilms.map((film) => (
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
