import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FilmCard from "../../src/components/FilmCard";

const baseProps = {
  id: "film-1",
  title: "Test Film",
  genre: "Drama",
  country: "Ireland",
  year: 2024,
  director: "A Director",
  description: "A short synopsis.",
  rating: "PG",
  runtime: "12 min",
  image: "images/film-001.svg",
};

describe("FilmCard", () => {
  it("renders the film details", () => {
    render(<FilmCard {...baseProps} />);

    expect(screen.getByRole("heading", { name: "Test Film" })).toBeInTheDocument();
    expect(screen.getByText("Drama · Ireland · 2024")).toBeInTheDocument();
    expect(screen.getByText("A short synopsis.")).toBeInTheDocument();
    expect(screen.getByText("Director: A Director")).toBeInTheDocument();
    expect(screen.getByText("Age rating: PG")).toBeInTheDocument();
    expect(screen.getByText("Runtime: 12 min")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Poster for Test Film");
  });

  it("shows fallbacks for missing details", () => {
    render(<FilmCard title="Bare Film" />);

    expect(
      screen.getByText(
        "Genre not recorded · Country not recorded · Year not recorded",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Director: Unknown")).toBeInTheDocument();
    expect(screen.getByText("Age rating: TBC")).toBeInTheDocument();
    expect(screen.getByText("Runtime: Runtime not recorded")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("uses buttonText until the film is selected", () => {
    const { rerender } = render(<FilmCard {...baseProps} buttonText="Pick me" />);
    expect(screen.getByRole("button")).toHaveTextContent("Pick me");

    rerender(<FilmCard {...baseProps} buttonText="Pick me" isSelected />);
    expect(screen.getByRole("button")).toHaveTextContent("Remove from programme");
    expect(screen.getByRole("article")).toHaveClass("film-card--selected");
  });

  it("calls onToggleSelect with the film id", async () => {
    const onToggleSelect = vi.fn();
    render(<FilmCard {...baseProps} onToggleSelect={onToggleSelect} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onToggleSelect).toHaveBeenCalledExactlyOnceWith("film-1");
  });

  it("renders award badges with winner and nominee styling", () => {
    render(
      <FilmCard
        {...baseProps}
        honours={[
          { bodyId: "award-a", result: "Winner", awardName: "Award A" },
          { bodyId: "award-b", result: "Nominated", awardName: "Award B" },
        ]}
      />,
    );

    const badges = screen.getAllByRole("listitem");
    expect(badges.map((b) => b.textContent)).toEqual([
      "🏆 Winner · Award A",
      "🎖 Nominated · Award B",
    ]);
    expect(badges[0]).toHaveClass("award-gold");
    expect(badges[1]).toHaveClass("award-silver");
  });

  it("renders no badge list when there are no honours", () => {
    render(<FilmCard {...baseProps} />);
    expect(screen.queryByRole("list", { name: "Awards" })).not.toBeInTheDocument();
  });
});
