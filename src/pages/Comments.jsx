import { useEffect, useState } from "react";
import Reddit from "../utils/Reddit";
import Post from "../components/Post";
import Comment from "../components/Comment";

function Comments({ user, setPosts }) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("https://www.reddit.com/r/AskReddit/comments/12j384c.json")
      .then((res) => res.json())
      .then((data) => {
        setPost(data[0].data.children[0]);
        setComments(data[1].data.children);
      });
  }, []);

  if (!post) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div className="dark:bg-slate-800 pt-8">
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
      <textarea
        placeholder="placeholder"
        className="relative justify-center flex mb-8 m-auto shadow shadow-slate-500 p-5 xl:p-2 xl:max-w-6xl dark:text-white dark:bg-slate-700 dark:shadow-none"
      ></textarea>
      {comments.map((comment) => (
        <Comment key={comment.data.id} comment={comment} />
      ))}
    </div>
  );
}
export default Comments;
