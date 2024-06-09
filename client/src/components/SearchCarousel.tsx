"use client";
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { Box, Typography } from "@mui/material";

const SearchCarousel = ({
  products,
  searchQuery,
  onItemClick,
}: SearchCarouselProps) => {
  const test = (product: string) => {
    console.log(product);
  };
  const renderProducts = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 3) {
      const rowProducts = products.slice(i, i + 3);
      rows.push(
        <Box key={i} display={"flex"} flex={1}>
          {rowProducts.map((product) => (
            <Box
              display={"grid"}
              gridTemplateColumns={"1fr"}
              gap={"1vw"}
              key={product.id}
              width={"33.333vw"}
              sx={{
                paddingInline: "1vw",
                paddingBlock: "4vh",
                cursor: "pointer",
              }}
              onClick={() => onItemClick(product.id)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "70vh",
                  backgroundColor: "lightgray",
                  backgroundImage: `url(${product.images[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-start"}
                height={"10vh"}
              >
                <Typography
                  className="poppins"
                  variant="subtitle1"
                  gutterBottom
                >
                  {product.name.toUpperCase()}
                </Typography>
                <Typography
                  className="poppins"
                  variant="subtitle2"
                  sx={{ fontWeight: 200, fontSize: "0.8rem" }}
                >
                  {product.category.toUpperCase()}
                </Typography>
                <Typography
                  className="poppins"
                  variant="subtitle2"
                  sx={{ fontWeight: 200, fontSize: "0.8rem" }}
                >
                  {`£${product.price}`}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      );
    }
    return rows;
  };

  // Calculate the total number of products rendered
  const totalResults = products.length;

  return (
    <Box>
      <Box textAlign={"center"}>
        <Typography
          variant="subtitle1"
          className="poppins"
          fontWeight={200}
          sx={{ fontSize: "0.8rem" }}
        >
          {totalResults} RESULTS FOR{" "}
          <span style={{ fontWeight: 400 }}>
            "{searchQuery?.toUpperCase()}"
          </span>
        </Typography>
      </Box>
      <Box sx={{ overflowX: "auto" }}>{renderProducts()}</Box>
    </Box>
  );
};

export default SearchCarousel;
