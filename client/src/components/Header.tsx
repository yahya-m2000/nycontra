"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Input,
  Drawer,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ShoppingBagOutlined, SearchOutlined } from "@mui/icons-material";
import { useBasket } from "@/context/BasketContext";
import Image from "next/image";

const HeaderTitle: React.FC<{ isHeaderHovered: boolean; isHome: boolean }> = ({
  isHeaderHovered,
  isHome,
}) => {
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

const DynamicIconButton: React.FC<{
  icon: React.ReactNode;
  onIconClick: () => void;
}> = ({ icon, onIconClick }) => {
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

const HeaderSearchButton: React.FC<{
  isHeaderHovered: boolean;
  isHome: boolean;
}> = ({ isHeaderHovered, isHome }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSearch = async () => {
    const query = `/search?q=${encodeURIComponent(searchValue)}`;
    console.log(query);
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
            paddingBlock: "1vh",
            zIndex: 100,
          }}
        >
          <Input
            sx={{
              width: "33vw",
              color: !isHome ? "black" : isHeaderHovered ? "black" : "white",
              fontSize: "0.7rem",
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={async (e) => {
              if (e.key === "Enter") {
                await handleSearch();
              }
            }}
            className="poppins"
          />
        </Box>
      )}
    </Box>
  );
};

const HeaderTextButton: React.FC<{
  name: string;
  isHeaderHovered: boolean;
  isHome: boolean;
}> = ({ name, isHeaderHovered, isHome }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");

  const router = useRouter();

  const handleTextMouseEnter = (itemName: string) => {
    setHoveredItem(itemName);
  };

  const handleTextMouseLeave = () => setHoveredItem("");

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleItemClick = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const buttonMenuItems: { label: string; search: string }[] = [];

  if (name === "FEATURED") {
    buttonMenuItems.push(
      { label: "NEW RELEASES", search: "new releases" },
      { label: "SHOP ALL", search: "all" }
    );
  } else if (name === "COLLECTIONS") {
    buttonMenuItems.push(
      { label: "NIKE", search: "nike" },
      { label: "FEAR OF GOD", search: "fear of god" }
    );
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
                onMouseEnter={() => handleTextMouseEnter(item.label)}
                onMouseLeave={handleTextMouseLeave}
                onClick={() => handleItemClick(item.search)}
                sx={{
                  color: hoveredItem === item.label ? "black" : "grey",
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const Header: React.FC<{
  isHeaderHovered: boolean;
  isHome: boolean;
  onHeaderMouseEnter: () => void;
  onHeaderMouseLeave: () => void;
}> = ({ isHeaderHovered, isHome, onHeaderMouseEnter, onHeaderMouseLeave }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { items } = useBasket();
  const router = useRouter();

  const handleBasketClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleBasketNavigate = () => {
    setDrawerOpen(false);
    router.push("/basket");
  };

  return (
    <>
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
        </Box>
        <HeaderTitle isHeaderHovered={isHeaderHovered} isHome={isHome} />
        <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
          <HeaderSearchButton
            isHeaderHovered={isHeaderHovered}
            isHome={isHome}
          />
          <DynamicIconButton
            icon={
              <ShoppingBagOutlined
                sx={{
                  color: !isHome
                    ? "black"
                    : isHeaderHovered
                    ? "black"
                    : "white",
                }}
              />
            }
            onIconClick={handleBasketClick}
          />
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{ width: "250px" }}
      >
        <Box
          sx={{
            width: "40vw",
            padding: "2.5vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography variant="subtitle2" color={"grey"}>
              SHOPPING CART
            </Typography>
            {items.length === 0 ? (
              <Typography variant="body2" sx={{ marginTop: "20px" }}>
                No items in basket
              </Typography>
            ) : (
              items.map((item) => (
                <Box
                  key={item.product.id}
                  sx={{
                    display: "flex",
                    // alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    margin: "10px 0",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box
                      sx={{
                        width: "7vw",
                        height: "17vh",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                    <Box sx={{ marginLeft: "10px" }}>
                      <Typography variant="body2">
                        {item.product.name.toUpperCase()}
                      </Typography>
                      <Typography variant="body2">
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        {/* {item.sizes} */}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      £{item.product.price}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBasketNavigate}
              sx={{ mt: 4 }}
            >
              Go to Basket
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
