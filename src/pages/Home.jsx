import { useState, useEffect } from "react";
import Post from "../components/Post";
import SubredditNav from "../components/SubredditNav";
import Reddit from "../utils/Reddit";
import { useParams } from "react-router-dom";

function Home({ isOpen, user }) {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const params = useParams();
  const signInError = sessionStorage.getItem("declined") || null;

  useEffect(() => {
    if (!params.subreddit && !user) {
      fetch("https://www.reddit.com/r/popular.json")
        .then((res) => res.json())
        .then((postsArr) => setPosts(postsArr.data.children));
    } else if (params.subreddit && !user) {
      fetch(`https://www.reddit.com/r/${params.subreddit}.json`)
        .then((res) => res.json())
        .then((postsArr) => setPosts(postsArr.data.children));
    } else {
      Reddit.getSubredditPosts(params.subreddit || "popular")
        .then((res) => res.json())
        .then((postsArr) => setPosts(postsArr.data.children));
    }
  }, [params]);

  useEffect(() => {
    if (!user) {
      fetch("https://www.reddit.com/subreddits/default.json")
        .then((res) => res.json())
        .then((subArr) => setSubreddits(subArr.data.children));
    } else {
      Reddit.getSubredditList()
        .then((res) => res.json())
        .then((subArr) => setSubreddits(subArr.data.children));
    }
  }, [user]);

  return (
    <div>
      {signInError && <h1 className="text-red-600">{signInError}</h1>}
      <div className="relative flex flex-col justify-center md:flex-row-reverse dark:bg-slate-800">
        {isOpen && <SubredditNav subreddits={subreddits} />}
        <div className="mx-4 mt-8">
          {posts.map((post) => (
            <Post
              key={post.data.id}
              id={post.data.id}
              subredditName={post.data.subreddit_name_prefixed}
              title={post.data.title}
              score={post.data.score}
              author={post.data.author}
              numComments={post.data.num_comments}
              created={post.data.created_utc}
              postImage={post.data.url_overridden_by_dest}
              name={post.data.name}
              isVideo={post.data.is_video}
              video={post.data?.media?.reddit_video?.fallback_url}
              media={post.data.media}
              thumbnail={post.data?.thumbnail}
              url={post.data?.url}
              locked={post.data.locked}
              user={user}
              likes={post.data.likes}
              setPosts={setPosts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
