import { render } from "@testing-library/react";
import React from "react";
import { Home } from ".";
import { Category } from "../shared/types";
import { ProductCardProps } from "./ProductCard";

jest.mock("./ProductCard", () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum;
    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

describe("Home", () => {
  describe("while loading", () => {
    it("renders loader", () => {
      const mockUserProducts = () => ({
        categories: [],
        isLoading: true,
        error: false,
      });

      const { container } = render(<Home useProductsHook={mockUserProducts} />);

      expect(container.innerHTML).toMatch("Loading");
    });
  });

  describe("with data", () => {
    const category: Category = {
      name: "Category Foo",
      items: [
        {
          name: "Product foo",
          price: 55,
          image: "/image.png",
        },
      ],
    };
    it("renders categories with products", () => {
      const mockUseProducts = () => ({
        categories: [category],
        isLoading: false,
        error: false,
      });
      const { container } = render(<Home useProductsHook={mockUseProducts} />);
      expect(container.innerHTML).toMatch("Category Foo");
      expect(container.innerHTML).toMatch("Product foo 55 /image.png");
    });
  });

  describe("with error", () => {
    it("renders error message", () => {
      const mockUseProducts = () => ({
        categories: [],
        isLoading: false,
        error: true,
      });

      const { container } = render(<Home useProductsHook={mockUseProducts} />);

      expect(container.innerHTML).toMatch("Error");
    });
  });
});
