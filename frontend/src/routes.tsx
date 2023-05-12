import { createBrowserRouter } from "react-router-dom";
import ExhibitPage from "./components/ExhibitPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
  },
  {
    path: "/exhibit/:id",
    element: <ExhibitPage />,
  },
]);

export default router;
