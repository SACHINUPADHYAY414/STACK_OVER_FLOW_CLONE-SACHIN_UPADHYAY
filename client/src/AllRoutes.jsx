import Auth from "./Pages/Auth/Auth";
import { Routes, Route } from "react-router-dom";
import Questions from "./Pages/Questions/Questions";
import Home from "./Pages/Home/Home";
import Tags from "./Pages/Tags/Tags";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Users from "./Pages/Users/Users";
import { ChatAI } from "./Pages/ChatAI/ChatAi";
import { Verify } from "./Pages/Verify/Verify";
import { Social } from "./Pages/Social/Social";
import PrivateRoute from "./PrivateRoutes";
import { PostForm } from "./Pages/Social/PostForm";
import { PostMain } from "./Pages/Social/PostMain";
import Subscription from "./Pages/Subscriptions/Subscription";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Questions" element={<Questions />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/Questions/:id" element={<DisplayQuestion />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Users/:id" element={<UserProfile />} />
      {/* Private routes */}

        <Route path="/" element={<PrivateRoute />}>
        <Route path="/post/:id" element={<PostMain />} />
        <Route path="/social" element={<Social />} />
        <Route path="/chatai" element={<ChatAI />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/social/addpost" element={<PostForm />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
