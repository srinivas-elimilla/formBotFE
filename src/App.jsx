import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./admin/Dashboard";
import Page404 from "./components/Page404";
import Settings from "./admin/Settings";
import FormBot from "./admin/formBot/FormBot";
import SharedForm from "./admin/SharedForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/form" element={<FormBot />} />
        <Route
          path="/form/:userId/:folderIndex/:formId"
          element={<SharedForm />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
