import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import AnimatedRoutes from "./components/AnimatedRoutes.jsx";

const router = (
  <BrowserRouter>
    <AnimatedRoutes />
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>{router}</Provider>
);
