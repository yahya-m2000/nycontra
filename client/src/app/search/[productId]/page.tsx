import { Header } from "@/app/components";
import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  params: {
    productId: string;
  };
};

const Page = ({ params }: Props) => {
  const products = {
    id: 1,
    image: "https://example.com/product1.jpg",
    title: "Product 1",
    type: "Type 1",
    price: 50,
    discountedPrice: 40,
  };
  return (
    <Box>
      <Header />
      <Box display={"flex"} flex={1} width={"100vw"}>
        {/* empty box left */}
        <Box
          display={"flex"}
          flex={0.333}
          flexDirection={"column"}
          //   marginInline={"1vw"}
          key={products.id}
        />
        {/* middle box scrollable */}
        <Box
          display={"flex"}
          flex={0.333}
          flexDirection={"column"}
          //   marginInline={"1vw"}
          height={"200vh"}
          key={products.id}
          sx={{
            backgroundColor: "yellow",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              backgroundColor: "red",
              marginInline: "1vw",
              marginBlock: "10vh",
            }}
            flex={1}
            height={"75vh"}
          ></Box>
        </Box>
        {/* right box nonscrollable with text */}
        <Box
          display={"flex"}
          flex={0.333}
          height={"100vh"}
          sx={{ backgroundColor: "blue", overflowY: "auto", top: 0 }}
          position={"sticky"}
          alignItems={"center"}
        >
          <Box
            sx={{ backgroundColor: "red" }}
            flex={1}
            height={"75vh"}
            marginBlock={"10vh"}
            marginInline={"1vw"}
          >
            <Box>
              <Typography>Title</Typography>
              <Typography>Brand</Typography>
              <Typography>Product Type</Typography>
            </Box>
            <Box>
              <Typography>£00.00</Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"}>
              <Box
                width={"3vw"}
                height={"3vw"}
                sx={{ backgroundColor: "blue" }}
              />
              <Box
                width={"3vw"}
                height={"3vw"}
                sx={{ backgroundColor: "blue" }}
              />
              <Box
                width={"3vw"}
                height={"3vw"}
                sx={{ backgroundColor: "blue" }}
              />
              <Box
                width={"3vw"}
                height={"3vw"}
                sx={{ backgroundColor: "blue" }}
              />
            </Box>
            <Box>
              <Typography>Select Size</Typography>
            </Box>

            <Box>
              <Typography>
                Lorem ipsum dolor sit amet. Sit aperiam omnis a omnis autem quo
                iusto aliquam est tempore explicabo. Ea atque ducimus ut
                veritatis distinctio nam reprehenderit expedita. Est maxime
                placeat sit maiores voluptatum eum sint labore et incidunt
                quidem ut nulla voluptate et nisi quia? Vel facere totam est
                alias atque ex ipsam vitae. Et earum veniam et facilis
                voluptatem est beatae saepe ut eaque atque nam fuga odio et
                corrupti galisum et perspiciatis labore. In tempore commodi rem
                labore nihil est quos saepe.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
