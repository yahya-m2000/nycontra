"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useBasket } from "@/context/BasketContext";
import { Box, Typography, IconButton, Button } from "@mui/material";
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
        height={"90vh"}
        flexDirection={"row"}
        marginInline={"10vw"}
        marginTop={"10vh"}
      >
        <Box display={"flex"} flex={1} flexDirection={"column"}>
          <Typography variant="h6" marginBottom="2rem">
            BASKET
          </Typography>
          <Box>
            {items.length === 0 ? (
              <Typography variant="h6">BASKET EMPTY</Typography>
            ) : (
              items.map(({ product, quantity }) => (
                <Box
                  key={product.id}
                  display={"flex"}
                  flex={1}
                  flexDirection={"row"}
                  marginBottom="2rem"
                  width={"100%"}
                >
                  <Box
                    flex={0.33}
                    sx={{
                      marginBottom: "4vh",
                    }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={"1000"}
                      height={"1000"}
                      style={{
                        width: "100%",
                        height: "20vh",
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
                    <Typography variant="subtitle1">
                      {product.name.toUpperCase()}
                    </Typography>
                    <Typography variant="subtitle1">
                      £{product.price}
                    </Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      // justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography variant="subtitle1">
                        Qty: {quantity}
                      </Typography>
                      <IconButton onClick={() => incrementItem(product.id)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => decrementItem(product.id)}>
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1">
                      Size: {product.selectedSize}
                    </Typography>
                    {product.selectedColor && (
                      <Typography variant="subtitle1">
                        {product.selectedColor}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box flex={1}>
          <Typography variant="h6" marginBottom="1rem">
            SUMMARY
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ marginTop: "2rem" }}
          >
            Proceed to Checkout
          </Button>
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
