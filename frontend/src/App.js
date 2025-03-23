import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./Root";
function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route index element={<Root />} />
   </Routes>
  </BrowserRouter>
 );
}

export default App;
