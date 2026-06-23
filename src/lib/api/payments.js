import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
export const getPurchases = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/user/purchases`, { headers: { authorization: `Bearer ${token}` } });
  return res.json();
};
