import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Page1 from "./pages/page1/Page1"
import Page2 from "./pages/page2/Page2"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/login" element={<Page2 />} />
      </Routes>
    </Router>
  );
}

export default App;
