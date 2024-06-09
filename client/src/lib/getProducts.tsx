export default async function getProducts(productName: string) {
  const res = await fetch(`${process.env.API_URL}/?name=${productName}`);

  if (!res.ok) throw new Error(`Fetching all products failed)`);

  return res.json();
}
