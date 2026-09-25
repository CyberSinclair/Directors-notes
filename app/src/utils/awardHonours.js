// A film's award wins and nominations, with award names attached, winners first.
export function getAwardHonours(film, awards) {
  return (film.honours || [])
    .filter(
      (honour) =>
        honour.bodyType === "Award" &&
        (honour.result === "Winner" || honour.result === "Nominated"),
    )
    .map((honour) => ({
      ...honour,
      awardName:
        awards.find((award) => award.id === honour.bodyId)?.name ??
        honour.bodyId,
    }))
    .sort((a, b) => (a.result === "Winner" ? -1 : 0) - (b.result === "Winner" ? -1 : 0));
}
