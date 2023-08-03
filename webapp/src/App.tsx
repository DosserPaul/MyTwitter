import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./index.scss";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/login" element={<h1>Login</h1>}/>
          <Route path="/register" element={<h1>Register</h1>}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
