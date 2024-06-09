export default async function getProduct(productId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/?_id=${productId}`
  );

  if (!res.ok) throw new Error(`Fetching ${productId} failed)`);
  //   console.log(`Fetching ${res.json()}`)

  return res.json();
}
