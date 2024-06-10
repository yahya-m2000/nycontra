"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Header, SearchCarousel } from "../../components";
import dynamic from "next/dynamic";

// Dynamically import the SearchCarousel to ensure it's wrapped in Suspense
const DynamicSearchCarousel = dynamic(
  () => import("../../components/SearchCarousel"),
  {
    ssr: false,
    loading: () => <p>Loading search results...</p>,
  }
);

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
        const data = await response.json();
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
    <React.Suspense fallback={<p>Loading...</p>}>
      <main>
        <Header
          isHeaderHovered={false}
          isHome={false}
          onHeaderMouseEnter={() => {}}
          onHeaderMouseLeave={() => {}}
        />
        <Box paddingBottom={"10vh"} />
        <DynamicSearchCarousel
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
              {/* eslint-disable react/no-unescaped-entities */}
              <span style={{ fontWeight: 400 }}>
                "{searchQuery?.toUpperCase()}"
              </span>
            </Typography>
          </Box>
        )}
      </main>
    </React.Suspense>
  );
};

export default SearchPage;
