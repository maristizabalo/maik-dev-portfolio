export const sendMaicolBotMessage = async ({ message, locale }) => {
  const response = await fetch("/api/maicol-bot/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, locale }),
  });

  if (!response.ok) {
    throw new Error("No fue posible contactar a Maicol Bot.");
  }

  return response.json();
};
