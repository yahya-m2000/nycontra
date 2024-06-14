"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const HeroImage = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: "black",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
      display={"flex"}
      flex={1}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box sx={{ zIndex: 10 }}>
        <Typography
          variant="h2"
          className="poppins"
          fontWeight={900}
          color={"white"}
          sx={{ pointerEvents: "none" }}
        >
          {process.env.NEXT_PUBLIC_HERO_IMAGE_TEXT}
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          sx={{ cursor: "pointer" }}
        >
          <Typography
            paddingInline={4}
            onClick={() => router.push("/men")}
            className="poppins"
            color={"white"}
            fontSize={"small"}
            fontWeight={"light"}
          >
            SHOP NOW
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          zIndex: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          opacity: 0.5,
        }}
      >
        <Image
          src={require("../images/background.png")}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </Box>
    </Box>
  );
};

export default HeroImage;
