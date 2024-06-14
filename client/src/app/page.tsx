"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Header, HeroImage } from "../components";
import { usePathname } from "next/navigation";

export default function Home() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const pathname = usePathname();

  const handleHeaderMouseEnter = () => {
    setIsHeaderHovered(true);
  };

  const handleHeaderMouseLeave = () => {
    setIsHeaderHovered(false);
  };

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  return (
    <main
      style={{
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <Header
        onHeaderMouseEnter={handleHeaderMouseEnter}
        onHeaderMouseLeave={handleHeaderMouseLeave}
        isHeaderHovered={isHeaderHovered}
        isHome={isHome}
      />
      <Box
        sx={{
          filter: isHeaderHovered ? "blur(2px)" : "none",
          transition: "filter 0.2s ease",
        }}
      >
        <HeroImage />
      </Box>
    </main>
  );
}
