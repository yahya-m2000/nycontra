"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import getProduct from "@/lib/getProduct";
import { useBasket } from "@/context/BasketContext";

type Params = {
  params: {
    productId: string;
  };
};

const Page = ({ params: { productId } }: Params) => {
  const [product, setProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData.products[0]);
        if (productData.products[0].images.length > 0) {
          setSelectedImage(productData.products[0].images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const { addItem } = useBasket();

  const handleAddToBasket = () => {
    if (product) {
      console.log(`Adding ${product.name} to basket`);
      addItem(product);
    }
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Box>
      <Header
        isHeaderHovered={false}
        isHome={false}
        onHeaderMouseEnter={() => {}}
        onHeaderMouseLeave={() => {}}
      />
      <Box display={"flex"} flex={1} width={"100vw"}>
        {/* left scrollable thumbnails */}
        <Box
          display={"flex"}
          flex={0.466}
          flexDirection={"column"}
          key={product?.id}
          sx={{
            cursor: "pointer",
            width: "46.6%",
            marginInline: "1vw",
            marginBlock: "10vh",
          }}
        >
          <Box>
            <Box
              display={"flex"}
              flex={0.2}
              flexDirection={"row"}
              key={product?.id}
              sx={{
                cursor: "pointer",
                overflowY: "auto",
              }}
            >
              {product?.images.map((image: string, index: number) => (
                <Box
                  key={index}
                  onMouseEnter={() => handleImageSelect(image)}
                  onClick={() => handleImageSelect(image)}
                  sx={{
                    marginBottom: "4vh",
                    cursor: "pointer",
                    width: "3vw",
                    height: "3vh",
                  }}
                >
                  <Image
                    src={image}
                    alt={product?.name}
                    width={"1000"}
                    height={"1000"}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
            {selectedImage ? (
              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <Image
                  src={selectedImage}
                  alt={product?.name || "Product image"}
                  width={"1000"}
                  height={"1000"}
                  style={{
                    height: "50vh",
                    width: "50vw",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        {/* right box non-scrollable with text */}
        <Box
          display={"flex"}
          flex={0.333}
          flexDirection={"column"}
          height={"100vh"}
          sx={{ overflowY: "auto", top: 0 }}
          position={"sticky"}
          alignItems={"center"}
        >
          <Box
            flex={1}
            height={"75vh"}
            marginBlock={"10vh"}
            marginInline={"1vw"}
          >
            <Box marginBlock="10vh" />
            <Box marginBlock={"1vw"}>
              <Typography fontSize="1.25rem" className="poppins">
                {product?.name}
              </Typography>
              <Typography fontSize={"0.9rem"} className="poppins" color="grey">
                £{product?.price}
              </Typography>
            </Box>
            <Box>
              <FormControl
                variant="standard"
                sx={{ marginBlock: "1vh", minWidth: 120, marginRight: "2vw" }}
              >
                <InputLabel className="poppins" sx={{ fontSize: "0.7rem" }}>
                  SELECT COLOUR
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Colour"
                >
                  {product?.colors.map((color: string, index: number) => (
                    <MenuItem key={index} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ marginBlock: "1vh", minWidth: 120 }}
              >
                <InputLabel className="poppins" sx={{ fontSize: "0.7rem" }}>
                  SELECT SIZE
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Size"
                >
                  {product?.sizes.map((size: string, index: number) => (
                    <MenuItem key={index} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box marginBlock={"2vh"}>
              <Typography fontSize={"0.7rem"} className="poppins">
                {product?.description}
              </Typography>
            </Box>
            <Box marginBlock={"2vh"} flex={1} display={"flex"}>
              <Button
                variant="contained"
                sx={{ boxShadow: "transparent", flex: 1 }}
                disableElevation
                onClick={handleAddToBasket}
              >
                Add to Basket
              </Button>
            </Box>
            <Box flexDirection={"column"}>
              <Accordion sx={{ boxShadow: 0, padding: 0 }}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  sx={{ boxShadow: 0, padding: 0 }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography sx={{ fontSize: "0.7rem" }} className="poppins">
                    SHIPPING POLICY
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ boxShadow: 0, padding: 0 }}>
                  <Typography sx={{ fontSize: "0.7rem" }} className="poppins">
                    {product?.shippingPolicy}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
