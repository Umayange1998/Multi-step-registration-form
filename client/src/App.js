
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import palette from "./theme/palette";
import typography from "./theme/typography";
import './App.css';

const Register = React.lazy(() => import("./pages/register/Register"));
const Login = React.lazy(() => import("./pages/login/Login"));






const theme = createTheme({
  palette: palette.light,
  typography,
});

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
   {
    path: "/",
    element: <Login />,
  },
])
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
