import { Box, Typography } from "@mui/material";
import React from "react";
import { Header } from "../../components";

type Props = {};

const page = (props: Props) => {
  return (
    <Box>
      {/* <Header
        isHeaderHovered={false}
        isHome={false}
        onHeaderMouseEnter={function (): void {
          throw new Error("Function not implemented.");
        }}
        onHeaderMouseLeave={function (): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      <Typography>men</Typography>
    </Box>
  );
};

export default page;
