import { createBrowserRouter } from "react-router-dom";
import Chatroom from "./components/Chatroom";

const router = createBrowserRouter([
  {
    path: "/",
    element: null,
  },
  {
    path: "/exhibit/:id",
    element: <Chatroom />,
  },
]);

export default router;
