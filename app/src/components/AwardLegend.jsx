//import { AwardCard } from "./FilmCard";

function AwardLegend({
  awards,
  categoryFilter,
  setCategoryFilter,
  selectedFilter,
  setSelectedFilter,
}) {
  const filteredAwards = awards.filter((award) => {
    if (categoryFilter === "") {
      return true;
    }

    return award.name === categoryFilter;
  });

  //console.log("my awards", awards);
  return (
    <div className="award-legend">
      <h3>Awards</h3>

      <div className="award-key">
        <button
          type="button"
          className={selectedFilter === "all" ? "selected" : ""}
          onClick={() => setSelectedFilter("all")}
        >
          All Films
        </button>

        <button
          type="button"
          className={selectedFilter === "winner" ? "selected" : ""}
          onClick={() => setSelectedFilter("winner")}
        >
          🏆 Award Winners
        </button>

        <button
          type="button"
          className={selectedFilter === "nominated" ? "selected" : ""}
          onClick={() => setSelectedFilter("nominated")}
        >
          🎖 Award Nominees
        </button>
      </div>

      <h2>Award Categories</h2>
      {filteredAwards.map((award) => (
        <button
          key={award.id}
          type="button"
          onClick={() => setCategoryFilter(award.name)}
        >
          {award.description}
        </button>
        
      ))}
    </div>
  );
}

export default AwardLegend;
