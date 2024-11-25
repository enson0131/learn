import { Routes, Route } from "react-router-dom";

import RenderCanvasInScreen from "@/components/RenderCanvasInScreen";
import RenderUndoCanvas from "@/components/RenderUndoCanvas";
import RenderInfiniteCanvas from "@/components/RenderInfiniteCanvas";
import RenderInfiniteCanvas2 from "@/components/RenderInfiniteCanvas2";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/RenderCanvasInScreen"
          element={<RenderCanvasInScreen />}
        />
        <Route path="/RenderUndoCanvas" element={<RenderUndoCanvas />} />
        <Route
          path="/RenderInfiniteCanvas"
          element={<RenderInfiniteCanvas />}
        />
        <Route
          path="/RenderInfiniteCanvas2"
          element={<RenderInfiniteCanvas2 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
