import { Home, Login, Register } from ".";

export const pages = [
  { path: "/", component: Home, isProtected: true },
  { path: "/sign-in", component: Login, isProtected: false },
  { path: "/sign-up", component: Register, isProtected: false },
];
