"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { Header, HeroImage } from "../components";
import { useRouter, usePathname } from "next/navigation";

const Overlay = ({ isBlurred }) => {
  return (
    isBlurred && (
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(5px)",
          zIndex: 1000, // Ensure it's above all other content
        }}
      />
    )
  );
};
export default function Home() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isHome, setIsHome] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const handleHeaderMouseEnter = () => {
    setIsHeaderHovered(true);
  };

  const handleHeaderMouseLeave = () => {
    setIsHeaderHovered(false);
  };

  useEffect(() => {
    setIsHeaderHovered(pathname === "/");
    setIsHome(pathname === "/");
    console.log(`${isHome}`);
  }, [pathname, isHome]);

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
