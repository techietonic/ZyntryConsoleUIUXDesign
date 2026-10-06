import { createBrowserRouter } from "react-router";
import ConsoleApp from "../App";

export const router = createBrowserRouter([
  { path: "/", Component: () => <ConsoleApp initialPage="home" /> },
  { path: "/sign-in", Component: () => <ConsoleApp initialPage="auth-signin" /> },
  { path: "/create-account", Component: () => <ConsoleApp initialPage="auth-signup" /> },
  { path: "/forgot-password", Component: () => <ConsoleApp initialPage="auth-forgot" /> },
  { path: "/verify", Component: () => <ConsoleApp initialPage="auth-verify" /> },
  { path: "*", Component: () => <ConsoleApp initialPage="home" /> },
]);
