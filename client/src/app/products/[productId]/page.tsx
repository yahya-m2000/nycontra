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
// import getRecommendedProducts from "@/lib/getRecommendedProducts";
import { useBasket } from "@/context/BasketContext";

type Params = {
  params: {
    productId: string;
  };
};

const Page = ({ params: { productId } }: Params) => {
  const [product, setProduct] = useState<Product>();
  // const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        const product = productData.products[0];
        setProduct(product);
        if (product.images.length > 0) {
          setSelectedImage(product.images[0]);
        }

        // // Fetch recommended products based on brand
        // const recommendedProductsData = await getRecommendedProducts(product.brand);
        // setRecommendedProducts(recommendedProductsData.products);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const { addItem } = useBasket();

  const handleAddToBasket = () => {
    if (product) {
      console.log(
        `Adding ${product.name} to basket with size ${selectedSize} and color ${selectedColor}`
      );
      addItem(product, selectedSize, selectedColor);
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
      <Box>
        <Box display={"flex"} flex={1} sx={{ marginInline: "15vw" }}>
          <Box display={"flex"} flex={0.5} marginBlock={"10vh"}>
            {/* left scrollable thumbnails */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              key={product?.id}
              sx={{
                cursor: "pointer",
                width: "3vw",
                marginRight: "2vw",
                overflowY: "auto",
              }}
            >
              {product?.images.map((image: string, index: number) => (
                <Box
                  key={index}
                  onMouseEnter={() => handleImageSelect(image)}
                  onClick={() => handleImageSelect(image)}
                  sx={{
                    marginBottom: "2vh",
                    cursor: "pointer",
                    // width: "100%",
                    // height: "10vh",
                  }}
                >
                  <Image
                    src={image}
                    alt={product?.name}
                    width={"1000"}
                    height={"1000"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Box>
            {/* selected image */}
            {selectedImage ? (
              <Box
                sx={{
                  overflow: "hidden",
                  flex: 1,
                  height: "48vh",
                  width: "20vw",
                }}
              >
                <Image
                  src={selectedImage}
                  alt={product?.name || "Product image"}
                  width={"2000"}
                  height={"2000"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            ) : null}
          </Box>
          {/* right box non-scrollable with text */}
          <Box
            display={"flex"}
            flex={1}
            flexDirection={"column"}
            position={"sticky"}
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
                  {product?.name.toUpperCase()}
                </Typography>
                <Typography
                  fontSize={"0.9rem"}
                  className="poppins"
                  color="grey"
                >
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
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value as string)}
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
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value as string)}
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
                  disabled={!selectedSize || !selectedColor} // Disable button if no size or color is selected
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

        {/* Recommended Products Section */}
        {/* <Box sx={{ marginTop: "5vh", marginInline: "15vw" }}>
          <Typography variant="h5" className="poppins" marginBottom="2vh">
            Recommended Products
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-around"
          >
            {recommendedProducts.map((recProduct) => (
              <Box
                key={recProduct.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ margin: "1vh", width: "15vw" }}
              >
                <Image
                  src={recProduct.images[0]}
                  alt={recProduct.name}
                  width={"1000"}
                  height={"1000"}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <Typography fontSize="1rem" className="poppins">
                  {recProduct.name}
                </Typography>
                <Typography fontSize={"0.9rem"} className="poppins" color="grey">
                  £{recProduct.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ boxShadow: "transparent", marginTop: "1vh" }}
                  disableElevation
                  href={`/product/${recProduct.id}`}
                >
                  View Product
                </Button>
              </Box>
            ))}
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Page;
