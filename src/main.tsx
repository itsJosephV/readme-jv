import * as ToolTip from "@radix-ui/react-tooltip";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import {Toaster} from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToolTip.Provider>
      <App />
      <Toaster />
    </ToolTip.Provider>
  </>,
);
