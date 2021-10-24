import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { Product } from "../shared/types";

describe("Product Card", () => {
  const product: Product = {
    name: "Product Foo",
    price: 55,
    image: "/image.png",
  };
  it("renders correctly", () => {
    const { container, getByRole } = render(<ProductCard datum={product} />);

    expect(container.innerHTML).toMatch("Product Foo");
    expect(container.innerHTML).toMatch("55 Zm");
    expect(getByRole("img")).toHaveAttribute("src", "/image.png");
  });

  describe("when product is in the cart", () => {
    it("the 'Add to cart' button is disabled", () => {
      const mockUseCartHook = () => ({
        addToCart: () => {},
        products: [product],
      });

      const { getByRole } = render(
        <ProductCard datum={product} useCartHook={mockUseCartHook as any} />
      );

      expect(getByRole("button")).toBeDisabled();
    });
  });

  describe("when product is not in the cart", () => {
    describe("on 'Add to cart' click", () => {
      it("calls 'addToCart' function", () => {
        const addToCart = jest.fn();
        const mockUseCartHook = () => ({
          addToCart,
          products: [],
        });

        const { getByText } = render(
          <ProductCard datum={product} useCartHook={mockUseCartHook} />
        );

        fireEvent.click(getByText("Add to cart"));
        expect(addToCart).toHaveBeenCalledWith(product);
      });
    });
  });
});
