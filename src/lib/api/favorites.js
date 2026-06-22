import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
export const getFavorites = async (page = 1) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/favorites?page=${page}`, { headers: { authorization: `Bearer ${token}` } });
  return res.json();
};