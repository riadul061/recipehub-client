"use server";
import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
export const createCheckoutSession = async (data) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/create-checkout-session`, { method: "POST", headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
  return res.json();
};