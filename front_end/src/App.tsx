import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import StoryCreate from "./Components/Pages/StoryCreate";
import StoryCreateMobile from "./Components/Pages/StoryCreateMobile";
import StoryPage from "./Components/Pages/StoryPage";
//import LogOut from './Components/Logout';
import LoginPage from "./Components/Pages/LoginPage";
import RegisterUser from "./Components/Pages/RegisterUser";
import EditUser from "./Components/Pages/EditUser";
import LandingPage from "./Components/Pages/LandingPage";
import { LoadScript, LoadScriptNext, useJsApiLoader } from "@react-google-maps/api";
import ProfilePage from "./Components/Pages/ProfilePage";
import StoryEdit from "./Components/Pages/StoryEdit";
import Search from "./Components/Pages/Search";
import Timeline from "./Components/Pages/Timeline";

const api_key = import.meta.env.VITE_GOOGLE_API_KEY;

const App = () => {
  return (
    <Router>
      <LoadScriptNext googleMapsApiKey={api_key} libraries={["places", "drawing"]}>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/storymobile" element={<StoryCreateMobile />}></Route>
          <Route path="/story" element={<StoryCreate />} />
          <Route path="/stories/:id" element={<StoryPage />} />
          <Route path="/stories/edit/:id" element={<StoryEdit />} />
          <Route path="/user/:name" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </LoadScriptNext>
    </Router>
  );
};

export default App;
