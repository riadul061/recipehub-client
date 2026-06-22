import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return <ProfileClient user={session.user} />;
}