

const getRecommendedProducts = async (brand: string) => {
  try {
    const res = await fetch(`/api/recommendedProducts?brand=${brand}`);
    return res.json();
  } catch (error) {
    console.error('Error fetching recommended products:', error);
    throw error;
  }
};

export default getRecommendedProducts;
