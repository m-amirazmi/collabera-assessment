import Navbar from "@/components/ui/navbar";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("Menu Items Mock", () => ({
  menuItems: [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
  ],
}));

describe("Navbar", () => {
  const title = "Collabera";
  it("renders the navbar that have a title/logo", () => {
    render(<Navbar title={title} />);
    expect(screen.getByText(title)).toBeDefined();
  });

  it("renders the search input field", () => {
    render(<Navbar title={title} />);
    const searchInputs = screen.getAllByRole("searchbox");
    expect(searchInputs[0]).toBeDefined();
  });
});
