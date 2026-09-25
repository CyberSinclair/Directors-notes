const resultForFilter = {
  winner: "Winner",
  nominated: "Nominated",
};

// Films with at least one honour matching the status filter and any of the
// selected award categories.
// selectedFilter: "all" | "winner" | "nominated"; categoryFilters: award names ([] = any).
export function filterFilms(films, awards, selectedFilter, categoryFilters) {
  // categoryFilters hold award names; honours reference awards by id.
  const categoryAwardIds = awards
    .filter((award) => categoryFilters.includes(award.name))
    .map((award) => award.id);
  const requiredResult = resultForFilter[selectedFilter];
  const anyCategory = categoryFilters.length === 0;

  if (!requiredResult && anyCategory) {
    return films;
  }

  return films.filter((film) =>
    (film.honours || []).some(
      (honour) =>
        (!requiredResult || honour.result === requiredResult) &&
        (anyCategory || categoryAwardIds.includes(honour.bodyId)),
    ),
  );
}
