"use client";
import React, { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingBagOutlined, SearchOutlined } from "@mui/icons-material";

interface HeaderTextProps {
  name: string;
  isHeaderHovered: boolean;
  isHome: boolean;
}

interface DynamicIconButtonProps {
  icon: JSX.Element;
  onIconClick: () => void;
}

interface HeaderSearchButtonProps {
  isHeaderHovered: boolean;
  isHome: boolean;
}

interface HeaderProps {
  isHeaderHovered: boolean;
  isHome: boolean;
  onHeaderMouseEnter: () => void;
  onHeaderMouseLeave: () => void;
}

let buttonMenuItems: string[] = [];

const HeaderTitle: React.FC<HeaderProps> = ({ isHeaderHovered, isHome }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        flex: 1,
        cursor: "pointer",
      }}
      textAlign={"center"}
      onClick={() => router.push("/")}
    >
      <Typography
        variant="h5"
        sx={{ color: !isHome ? "black" : isHeaderHovered ? "black" : "white" }}
        className="poppins"
      >
        <span style={{ fontWeight: "700" }}>NY</span>
        <span style={{ fontWeight: 200 }}>Contra</span>
      </Typography>
    </Box>
  );
};

const DynamicIconButton: React.FC<DynamicIconButtonProps> = ({
  icon,
  onIconClick,
}) => {
  return (
    <IconButton
      sx={{
        cursor: "pointer",
        paddingInline: "3vw",
        paddingBlock: 3,
        fontSize: "0.7rem",
      }}
      onClick={onIconClick}
    >
      {icon}
    </IconButton>
  );
};

const HeaderSearchButton: React.FC<HeaderSearchButtonProps> = ({
  isHeaderHovered,
  isHome,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSearch = () => {
    // Construct the search query
    const query = `/search?q=${encodeURIComponent(searchValue)}`;
    console.log(query);
    // Navigate to the search page with the query
    router.push(query);
  };

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DynamicIconButton
        icon={
          <SearchOutlined
            sx={{
              color: !isHome ? "black" : isHeaderHovered ? "black" : "white",
            }}
          />
        }
        onIconClick={() => {}}
      />
      {isHovered && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            left: "50%",
            transform: "translateX(-50%)",
            position: "absolute",
            backgroundColor: "white",
            top: "5vh",
            width: "100vw",
            paddingInline: "3vw",
            paddingBlock: "1.5vh",
            zIndex: 100,
          }}
        >
          <TextField
            sx={{
              width: "33vw",
              color: !isHome ? "black" : isHeaderHovered ? "black" : "white",
              fontSize: "0.65rem",
            }}
            variant="standard"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

const HeaderTextButton: React.FC<HeaderTextProps> = ({
  name,
  isHeaderHovered,
  isHome,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");

  const handleTextMouseEnter = (itemName: string) => {
    setHoveredItem(itemName);
  };

  const handleTextMouseLeave = () => {
    setHoveredItem("");
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  if (name === "FEATURED") {
    buttonMenuItems = ["Featured Item 1", "Featured Item 2", "Featured Item 3"];
  } else if (name === "COLLECTIONS") {
    buttonMenuItems = [
      "Collection Item 1",
      "Collection Item 2",
      "Collection Item 3",
    ];
  }

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Typography
        variant="subtitle2"
        paddingInline={"1vw"}
        marginInline={"2vw"}
        paddingBlock={"1.5vh"}
        sx={{
          cursor: "pointer",
          position: "relative",
          color: !isHome ? "black" : isHeaderHovered ? "black" : "white",
        }}
        className="poppins"
        fontSize={"0.7rem"}
        fontWeight={"light"}
      >
        {name}
      </Typography>
      {isHovered && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            left: "50%",
            transform: "translateX(-50%)",
            position: "absolute",
            backgroundColor: "white",
            transition: "background-color 0.2s ease",
            top: "5vh",
            width: "100vw",
            paddingInline: "3vw",
            paddingBlock: "1.5vh",
            zIndex: 100,
          }}
        >
          <Box marginRight={"3vw"}>
            {buttonMenuItems.map((item, index) => (
              <Typography
                key={index}
                variant="subtitle2"
                fontSize={"0.65rem"}
                onMouseEnter={() => handleTextMouseEnter(item)}
                onMouseLeave={handleTextMouseLeave}
                sx={{
                  color: hoveredItem === item ? "black" : "grey", // Change color when hovered
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const Header: React.FC<HeaderProps> = ({
  isHeaderHovered,
  isHome,
  onHeaderMouseEnter,
  onHeaderMouseLeave,
}) => {
  return (
    <Box
      onMouseEnter={onHeaderMouseEnter}
      onMouseLeave={onHeaderMouseLeave}
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: !isHome
          ? "white"
          : isHeaderHovered
          ? "white"
          : "transparent",
        transition: "background-color 0.2s ease",
        zIndex: 1000,
      }}
      height={"5vh"}
      width={"100vw"}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"fixed"}
    >
      <Box display={"flex"} flex={1} flexDirection={"row"}>
        <HeaderTextButton
          name="FEATURED"
          isHeaderHovered={isHeaderHovered}
          isHome={isHome}
        />
        <HeaderTextButton
          name="COLLECTIONS"
          isHeaderHovered={isHeaderHovered}
          isHome={isHome}
        />
        {/* <HeaderTextButton
          name="ACCESSORIES"
          isHeaderHovered={isHeaderHovered}
          isHome={isHome}
        /> */}
      </Box>
      <HeaderTitle
        isHeaderHovered={isHeaderHovered}
        isHome={isHome}
        onHeaderMouseEnter={function (): void {
          throw new Error("Function not implemented.");
        }}
        onHeaderMouseLeave={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
        <HeaderSearchButton isHeaderHovered={isHeaderHovered} isHome={isHome} />
        <DynamicIconButton
          icon={
            <ShoppingBagOutlined
              sx={{
                color: !isHome ? "black" : isHeaderHovered ? "black" : "white",
              }}
            />
          }
          onIconClick={() => {}}
        />
      </Box>
    </Box>
  );
};

export default Header;
