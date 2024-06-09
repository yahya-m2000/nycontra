// PRODUCT PROPS
type Product = {
  id: string;
  images: string[];
  name: string;
  category: string;
  price: number;
  discountedPrice?: number;
  description: string;
  gender: string;
  brand: string;
  colors: string[];
  sizes: string[];
  shippingPolicy: string;
  createdAt: string;
  updatedAt: string;
};

// HEADER PROPS
type HeaderTextProps = {
  name: string;
  isHeaderHovered: boolean;
  isHome: boolean;
};

type DynamicIconButtonProps = {
  icon: JSX.Element;
  onIconClick: () => void;
};

type HeaderSearchButtonProps = {
  isHeaderHovered: boolean;
  isHome: boolean;
};

type HeaderProps = {
  isHeaderHovered: boolean;
  isHome: boolean;
  onHeaderMouseEnter: () => void;
  onHeaderMouseLeave: () => void;
};

// SEARCH CAROUSEL PROPS
type SearchCarouselProps = {
  products: Product[];
  searchQuery: string | null;
  onItemClick: (id: string) => void;
};
