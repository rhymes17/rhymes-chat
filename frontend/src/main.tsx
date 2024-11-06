import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Layout from "./components/Layout.tsx";
import Signup from "./pages/Signup.tsx";
import Chats from "./pages/Chats.tsx";
import { AuthProvider } from "./context/useAuth.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Profile from "./pages/Profile.tsx";
import Conversation from "./pages/Conversation.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/chats/:id" element={<Conversation />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
