import { fireEvent, render, screen } from "@testing-library/react";
import { ProductListing } from "@/components/ProductListing";
import { Product } from "@/types";

const products: Product[] = [
  {
    id: 1,
    title: "Canvas Tote Bag",
    price: 22,
    description: "Reusable tote",
    category: "women's clothing",
    image: "https://example.com/tote.jpg",
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 99.99,
    description: "Tracks your health",
    category: "electronics",
    image: "https://example.com/watch.jpg",
  },
];

describe("ProductListing", () => {
  it("filters products by search query", () => {
    render(
      <ProductListing
        products={products}
        categories={["women's clothing", "electronics"]}
        source="api"
        error={undefined}
      />,
    );

    const searchInputs = screen.getAllByPlaceholderText("Search products...");
    const searchBox = searchInputs[0];

    fireEvent.change(searchBox, { target: { value: "watch" } });

    expect(screen.getByText("Smart Fitness Watch")).toBeInTheDocument();
    expect(screen.queryByText("Canvas Tote Bag")).not.toBeInTheDocument();
  });
});

