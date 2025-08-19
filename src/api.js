const API_KEY = "f2294d4804f91924084d0d1092b76ba3"; // 🔑 Your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentByCity(city, unit = "metric") {
  const res = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
  if (!res.ok) throw new Error("Failed to fetch current weather by city");
  return res.json();
}

export async function getForecastByCity(city, unit = "metric") {
  const res = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`);
  if (!res.ok) throw new Error("Failed to fetch forecast by city");
  return res.json();
}

export async function getCurrentByCoords(lat, lon, unit = "metric") {
  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`);
  if (!res.ok) throw new Error("Failed to fetch current weather by coordinates");
  return res.json();
}

export async function getForecastByCoords(lat, lon, unit = "metric") {
  const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`);
  if (!res.ok) throw new Error("Failed to fetch forecast by coordinates");
  return res.json();
}
