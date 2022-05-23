import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { AppV1 } from "./AppV1";
import { AppV2 } from "./AppV2";

function Home() {
  return (
    <div>
      <Link to="/1">V1</Link> |<Link to="/2">V2</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/1" element={<AppV1 />} />
          <Route path="/2" element={<AppV2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
