export const fetchNewsArticles = async (query) => {
  const today = new Date();
  const to = today.toISOString().split("T")[0];

  const fromDate = new Date();
  fromDate.setDate(today.getDate() - 7); // Últimos 7 días
  const from = fromDate.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.newexplorer.mooo.com/api/news?q=${encodeURIComponent(
        query
      )}&from=${from}&to=${to}`
    );

    if (!response.ok) {
      throw new Error("Error al obtener artículos desde el backend.");
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("fetchNewsArticles:", error.message);
    throw error;
  }
};
