export async function getrandomQuote() {
  const respons = await fetch("https://dummyjson.com/quotes/random");
  if (!respons.ok) {
    throw new Error("API error");
  }

  const data = await respons.json();

  return {
    text: data.quote,
    author: data.author,
  };
}
