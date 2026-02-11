import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
            <App />
        </ChakraProvider>
    </BrowserRouter>,
);
