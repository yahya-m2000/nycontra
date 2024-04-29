"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Header, SearchCarousel } from "../components";

type Props = {};

const SearchPage = (props: Props) => {
  const searchParams = useSearchParams();
  const products = [
    {
      id: 1,
      image: "https://example.com/product1.jpg",
      title: "Product 1",
      type: "Type 1",
      price: 50,
      discountedPrice: 40,
    },
    {
      id: 2,
      image: "https://example.com/product2.jpg",
      title: "Product 2",
      type: "Type 2",
      price: 60,
    },
    {
      id: 3,
      image: "https://example.com/product3.jpg",
      title: "Product 3",
      type: "Type 3",
      price: 70,
      discountedPrice: 55,
    },
    {
      id: 4,
      image: "https://example.com/product3.jpg",
      title: "Product 4",
      type: "Type 4",
      price: 70,
      discountedPrice: 55,
    },
    {
      id: 5,
      image: "https://example.com/product3.jpg",
      title: "Product 5",
      type: "Type 5",
      price: 70,
      discountedPrice: 55,
    },
  ];

  // Extract the search query from the URL
  const searchQuery = searchParams.get("q");
  console.log(searchQuery);

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery?.toLowerCase() ?? "")
  );

  return (
    <main>
      <Header
        isHeaderHovered={false}
        isHome={false}
        onHeaderMouseEnter={function (): void {
          // throw new Error("Function not implemented.");
        }}
        onHeaderMouseLeave={function (): void {
          // throw new Error("Function not implemented.");
        }}
      />
      <Box paddingBottom={"10vh"} />
      <SearchCarousel products={filteredProducts} searchQuery={searchQuery} />
      {filteredProducts.length === 0 ? (
        <Box>
          <Typography
            variant="subtitle1"
            className="poppins"
            fontWeight={200}
            sx={{ fontSize: "0.8rem" }}
          >
            NO RESULTS FOUND FOR{" "}
            <span style={{ fontWeight: 400 }}>
              "{searchQuery?.toUpperCase()}"
            </span>
          </Typography>
        </Box>
      ) : null}
    </main>
  );
};

export default SearchPage;
