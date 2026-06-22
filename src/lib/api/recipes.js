import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getRecipes = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${baseURL}/api/recipes?${query}`);
  return res.json();
};
export const getPopularRecipes = async () => {
  const res = await fetch(`${baseURL}/api/recipes/popular`);
  return res.json();
};
export const getRecipeById = async (id) => {
  const res = await fetch(`${baseURL}/api/recipes/${id}`);
  return res.json();
};
export const getMyRecipes = async (page = 1) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/recipes/my-recipes?page=${page}`, { headers: { authorization: `Bearer ${token}` } });
  return res.json();
};
export const getUserStats = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/user/stats`, { headers: { authorization: `Bearer ${token}` } });
  return res.json();
};