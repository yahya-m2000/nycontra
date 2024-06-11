"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Header } from "@/components";
import dynamic from "next/dynamic";

// Dynamically import the SearchContent to ensure it's wrapped in Suspense
const DynamicSearchContent = dynamic(
  () => import("@/components/SearchContent"),
  {
    ssr: false,
    loading: () => <p>Loading search page...</p>,
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
