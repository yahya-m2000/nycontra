"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Header, SearchCarousel } from "../../components";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Extract the search query from the URL
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}?name=${searchQuery}`
        );
        console.log(`${process.env.NEXT_PUBLIC_API_URL}?name=${searchQuery}`);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch products");
        // }
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleProductClick = (productId: string) => {
    // const formattedProductName = productName.toLowerCase().replace(/\s+/g, "-");
    console.log(productId);
    router.push(`/products/${productId}`);
  };

  if (isLoading) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchQuery?.toLowerCase() ?? "")
      )
    : [];

  return (
    <main>
      <Header
        isHeaderHovered={false}
        isHome={false}
        onHeaderMouseEnter={() => {}}
        onHeaderMouseLeave={() => {}}
      />
      <Box paddingBottom={"10vh"} />
      <SearchCarousel
        products={filteredProducts}
        searchQuery={searchQuery}
        onItemClick={handleProductClick}
      />
      {filteredProducts.length === 0 && (
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
      )}
    </main>
  );
};

export default SearchPage;
