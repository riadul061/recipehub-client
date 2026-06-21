"use server";
import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const addRecipe = async (recipe) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/recipes`, {
    method: "POST", headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify(recipe),
  });
  return res.json();
};
export const deleteRecipe = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/recipes/${id}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } });
  return res.json();
};
export const likeRecipe = async (id) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/recipes/${id}/like`, { method: "POST", headers: { authorization: `Bearer ${token}` } });
  return res.json();
};