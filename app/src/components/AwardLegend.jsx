function AwardLegend({ selectedFilter, setSelectedFilter }) {
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
    </div>
  );
}

export default AwardLegend;
