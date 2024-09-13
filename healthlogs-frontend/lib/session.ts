import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = token;

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function createUserCookies(user: any) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("user", user, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export function deleteSession() {
  cookies().delete("session");
}
export async function updateSession(token: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = token;
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}
export const verifySession = cache(async () => {
  const session = cookies().get("session")?.value;
  if (!session) {
    redirect("/auth/login");
  }

  return { isAuth: true, session: session };
});
export const verifyLoggedIn = cache(async () => {
  const session = cookies().get("session")?.value;
  if (session) {
    redirect("/dashboard");
  }
});
export const sessionToken = async () => {
  return await verifySession();
};
