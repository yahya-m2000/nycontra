"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useBasket } from "@/context/BasketContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Header } from "@/components";
import CheckoutModal from "@/components/CheckoutModal";

const Basket = () => {
  const { items, incrementItem, decrementItem } = useBasket();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = async (formData: any) => {
    const orderData = {
      customer: formData,
      items,
    };

    try {
      const response = await fetch("/api/sendOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      console.log("Order Data:", orderData);
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(items);

  return (
    <Box>
      <Header
        isHeaderHovered={false}
        isHome={false}
        onHeaderMouseEnter={function (): void {}}
        onHeaderMouseLeave={function (): void {}}
      />
      <Box paddingBottom={"10vh"} />
      <Box
        display={"flex"}
        flex={1}
        width={"100vw"}
        height={"90vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            width: "40vw",
            minHeight: "60vh",
            padding: "2rem",
            marginRight: "2vw",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            marginBottom="2rem"
            sx={{ position: "absolute", top: "2rem" }}
          >
            Basket
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxHeight: "50vh",
              overflowY: "auto",
              marginTop: "4rem",
            }}
          >
            {items.length === 0 ? (
              <Typography variant="h6">BASKET EMPTY</Typography>
            ) : (
              items.map(({ product, quantity }) => (
                <Box
                  key={product.id}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  marginBottom="2rem"
                  width={"100%"}
                >
                  <Box
                    sx={{
                      marginBottom: "4vh",
                      cursor: "pointer",
                      width: "10vw",
                      height: "10vh",
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={"1000"}
                      height={"1000"}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    flex={1}
                    flexDirection={"column"}
                    marginLeft="1rem"
                    display="flex"
                  >
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>£{product.price}</Typography>
                    <Typography>Quantity: {quantity}</Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton onClick={() => incrementItem(product.id)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => decrementItem(product.id)}>
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                    <FormControl
                      variant="standard"
                      sx={{ marginBlock: "1vh", minWidth: 120 }}
                    >
                      <InputLabel
                        className="poppins"
                        sx={{ fontSize: "0.7rem" }}
                      >
                        SELECT SIZE
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Size"
                      >
                        {product.sizes.map((size: string, index: number) => (
                          <MenuItem key={index} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              ))
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ marginTop: "2rem" }}
          >
            Proceed to Checkout
          </Button>
        </Box>
        <Box
          sx={{
            width: "30vw",
            minHeight: "30vh",
            padding: "2rem",
          }}
        >
          <Typography variant="h4" marginBottom="1rem">
            Summary
          </Typography>
          <Typography variant="h6" marginBottom="1rem">
            Estimate Delivery: £5.00
          </Typography>
          <Typography variant="h6">
            Subtotal: £
            {items
              .reduce(
                (total, { product, quantity }) =>
                  total + product.price * quantity,
                0
              )
              .toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <CheckoutModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Basket;
