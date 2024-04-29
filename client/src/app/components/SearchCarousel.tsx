"use client";
/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { Box, Typography } from "@mui/material";

type Product = {
  id: number;
  image: string;
  title: string;
  type: string;
  price: number;
  discountedPrice?: number;
};

type Props = {
  products: Product[];
  searchQuery: string | null;
};

const SearchCarousel = ({ products, searchQuery }: Props) => {
  const handleItemClick = (id: number) => {
    console.log("Selected item ID:", id);
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
              onClick={() => handleItemClick(product.id)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "75vh",
                  backgroundColor: "lightgray",
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
                  {product.title.toUpperCase()}
                </Typography>
                <Typography
                  className="poppins"
                  variant="subtitle2"
                  sx={{ fontWeight: 200, fontSize: "0.8rem" }}
                >
                  {product.type.toUpperCase()}
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
