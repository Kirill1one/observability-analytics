
export const sendAnalyticsEvent = async (event, data = {}) => {
  try {
    await fetch("http://localhost:5173/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, data, timestamp: Date.now() }),
    });
  } catch (e) {
    console.error("Analytics error:", e);
  }
};
