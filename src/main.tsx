import * as ToolTip from "@radix-ui/react-tooltip";
import ReactDOM from "react-dom/client";
import {Toaster} from "sonner";

import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToolTip.Provider>
      <App />
      <Toaster richColors theme="light" visibleToasts={1} />
    </ToolTip.Provider>
  </>,
);
