"use client";
import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material"; // Import CircularProgress for the loading circle
import { Header } from "@/components";
import dynamic from "next/dynamic";

// Dynamically import the SearchContent to ensure it's wrapped in Suspense
const DynamicSearchContent = dynamic(
  () => import("@/components/SearchContent"),
  {
    ssr: false,
    loading: () => <CircularProgress />, // Render CircularProgress while loading
  }
);

const SearchPage = () => {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <main>
        <Header
          isHeaderHovered={false}
          isHome={false}
          onHeaderMouseEnter={() => {}}
          onHeaderMouseLeave={() => {}}
        />
        <DynamicSearchContent />
      </main>
    </React.Suspense>
  );
};

export default SearchPage;
