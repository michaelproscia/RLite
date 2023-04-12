import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Reddit from "./utils/Reddit";
import Comments from "./pages/Comments";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isAllowed = JSON.parse(sessionStorage.getItem("allowed")) || null;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  useEffect(() => {
    Reddit.getAccessToken();
    if (isAllowed) {
      Reddit.getUser()
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Header
              setIsOpen={setIsOpen}
              theme={theme}
              setTheme={setTheme}
              user={user}
            />
          }
        >
          <Route
            index
            element={
              <Home
                isOpen={isOpen}
                user={user}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
          <Route
            path="/:subreddit"
            element={
              <Home
                isOpen={isOpen}
                user={user}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/post/:post"
            element={<Comments user={user} posts={posts} setPosts={setPosts} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
