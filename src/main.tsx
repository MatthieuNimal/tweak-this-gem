import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force rebuild
createRoot(document.getElementById("root")!).render(<App />);
