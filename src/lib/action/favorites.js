"use server";
import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const addFavorite = async (recipeId) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/favorites`, { method: "POST", headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ recipeId }) });
  return res.json();
};
export const removeFavorite = async (recipeId) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/favorites/${recipeId}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } });
  return res.json();
};