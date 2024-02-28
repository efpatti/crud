import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./Root";
import SignUp from "./SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Root />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
