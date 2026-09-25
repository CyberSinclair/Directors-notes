// Combined runtime of films, in whole minutes.
export function totalRuntimeMinutes(films) {
  const totalSeconds = films.reduce(
    (sum, film) => sum + (film.runtimeSeconds || 0),
    0,
  );
  return Math.floor(totalSeconds / 60);
}

// "45 min" up to 120 minutes, then hours: "2 hr 5 min", "3 hr".
export function formatRuntime(minutes) {
  if (minutes <= 120) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
}
