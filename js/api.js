export async function getrandomQuote() {
  const respons = await fetch("https://api.quotable.io/random");
  if (!respons.ok) {
    throw new Error("API error");
  }

  const data = await respons.json();

  return {
    text: data.content,
    author: data.author,
  };
}
