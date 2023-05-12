import { createBrowserRouter } from "react-router-dom";
import Exhibit from "./components/Exhibit";
import { exhibitLoader } from "./loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
  },
  {
    path: "/exhibit/:id",
    element: <Exhibit />,
    loader: exhibitLoader,
  },
]);

export default router;
