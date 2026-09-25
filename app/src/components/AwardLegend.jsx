function AwardLegend({
  awards,
  categoryFilters,
  onToggleCategory,
  onClearCategories,
  selectedFilter,
  setSelectedFilter,
}) {
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
      {awards.map((award) => {
        const isActive = categoryFilters.includes(award.name);
        return (
          <button
            key={award.id}
            type="button"
            className={isActive ? "selected" : ""}
            aria-pressed={isActive}
            onClick={() => onToggleCategory(award.name)}
          >
            {award.description}
          </button>
        );
      })}

      {categoryFilters.length > 0 && (
        <button type="button" onClick={onClearCategories}>
          ✕ Clear category
        </button>
      )}
    </div>
  );
}

export default AwardLegend;
