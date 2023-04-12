import convertUTC from "../utils/convertUTC";
import Reddit from "../utils/Reddit";
import { useEffect, useState } from "react";

function Post({
  title,
  score,
  author,
  numComments,
  created,
  postImage,
  subredditName,
  name,
  isVideo,
  video,
  thumbnail,
  url,
  locked,
  user,
  likes,
  id,
  setPosts,
}) {
  const [vote, setVote] = useState(null);

  useEffect(() => {
    if (user) {
      setVote(likes);
    }
  }, [numComments]);

  function handleSetPosts(vote) {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.data.id === id) {
          return {
            ...post,
            data: {
              ...post.data,
              score: post.data.score + vote,
            },
          };
        } else {
          return post;
        }
      });
    });
  }

  function handleUpVote() {
    if (!user) {
      Reddit.getAuthorization();
    } else if (!locked) {
      if (vote === false) {
        Reddit.vote(name, "1");
        setVote(true);
        handleSetPosts(2);
      } else if (vote === null) {
        setVote(true);
        handleSetPosts(1);
      } else {
        Reddit.vote(name, "0");
        setVote(null);
        handleSetPosts(-1);
      }
    }
  }

  function handleDownVote() {
    if (!user) {
      Reddit.getAuthorization();
    } else if (!locked) {
      if (vote === true) {
        Reddit.vote(name, "-1");
        setVote(false);
        handleSetPosts(-2);
      } else if (vote === null) {
        setVote(false);
        handleSetPosts(-1);
      } else {
        Reddit.vote(name, "0");
        setVote(null);
        handleSetPosts(1);
      }
    }
  }

  return (
    <div className="relative justify-center flex mb-8 m-auto shadow shadow-slate-500 p-5 xl:p-2 xl:max-w-6xl dark:text-white dark:bg-slate-700 dark:shadow-none">
      <div className="absolute left-5 mt-2 flex flex-col items-center gap-2">
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className={`stroke-orange-400 ${
            vote === true ? "fill-orange-400" : "fill-none"
          } stroke-2 cursor-pointer`}
          onClick={handleUpVote}
        >
          <path d="m4 14h2 2v3 4c0 .553.447 1 1 1h6c.553 0 1-.447 1-1v-5-2h1 3c.385 0 .734-.221.901-.566.166-.347.12-.758-.12-1.059l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10c-.24.301-.286.712-.12 1.059.167.345.516.566.901.566z" />
        </svg>

        <p className="text-xs md:text-sm">{score}</p>
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className={`stroke-purple-400 ${
            vote === false ? "fill-purple-400" : "fill-none"
          } stroke-2 cursor-pointer`}
          onClick={handleDownVote}
        >
          <path d="m20.901 10.566c-.167-.345-.516-.566-.901-.566h-2-2v-3-4c0-.553-.447-1-1-1h-6c-.553 0-1 .447-1 1v5 2h-1-3c-.385 0-.734.221-.901.566-.166.347-.12.758.12 1.059l8 10c.19.237.477.375.781.375s.591-.138.781-.375l8-10c.24-.301.286-.712.12-1.059z" />
        </svg>
      </div>
      <div className="flex flex-col items-center text-center gap-4 w-3/4 mx-14">
        <div className="flex flex-col w-full justify-start items-start">
          <h5 className="text-xl">{subredditName}</h5>
          <div className="flex items-center">
            <svg
              className="h-3"
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                className="dark:stroke-white"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m12 6v6l4 4" />
              </g>
            </svg>
            <p className="text-xs md:text-sm">{convertUTC(created)}</p>
          </div>
        </div>
        <h4 className="font-bold text-xl">{title}</h4>
        {isVideo && (
          <video controls>
            <source src={video} type="video/mp4" />
          </video>
        )}
        {postImage && (
          <a href={postImage} target="_blank">
            <img src={postImage} alt="" />
          </a>
        )}
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-1">
            <svg
              className="h-3.5"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"
                fill="#0D0D0D"
                className="dark:fill-white"
              />
            </svg>
            <p className="text-xs md:text-sm">{author}</p>
          </div>
          <a href={url} target="_blank" className="flex items-center gap-1">
            <svg
              className="fill-white"
              height="16"
              viewBox="0 0 8 8"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m5.88.03c-.18.01-.36.03-.53.09-.27.1-.53.25-.75.47a.5.5 0 1 0 .69.69c.11-.11.24-.17.38-.22.35-.12.78-.07 1.06.22.39.39.39 1.04 0 1.44l-1.5 1.5c-.44.44-.8.48-1.06.47s-.41-.13-.41-.13a.5.5 0 1 0 -.5.88s.34.22.84.25 1.2-.16 1.81-.78l1.5-1.5c.78-.78.78-2.04 0-2.81-.28-.28-.61-.45-.97-.53-.18-.04-.38-.04-.56-.03zm-2 2.31c-.5-.02-1.19.15-1.78.75l-1.5 1.5c-.78.78-.78 2.04 0 2.81.56.56 1.36.72 2.06.47.27-.1.53-.25.75-.47a.5.5 0 1 0 -.69-.69c-.11.11-.24.17-.38.22-.35.12-.78.07-1.06-.22-.39-.39-.39-1.04 0-1.44l1.5-1.5c.4-.4.75-.45 1.03-.44s.47.09.47.09a.5.5 0 1 0 .44-.88s-.34-.2-.84-.22z" />
            </svg>
            <p className="text-xs md:text-sm">Link</p>
          </a>
          <div className="flex items-center gap-1">
            <svg
              className="h-3"
              fill="none"
              height="12"
              viewBox="0 0 12 12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="dark:fill-white"
                d="m3 2c-.55228 0-1 .44772-1 1v4c0 .55228.44772 1 1 1h.5c.27614 0 .5.22386.5.5v1.06574l2.22265-1.48177c.08213-.05475.17864-.08397.27735-.08397h2.5c.55229 0 1-.44772 1-1v-4c0-.55228-.44771-1-1-1zm-2 1c0-1.10457.89543-2 2-2h6c1.1046 0 2 .89543 2 2v4c0 1.10457-.8954 2-2 2h-2.34861l-2.87404 1.916c-.15343.1023-.3507.1118-.51328.0248s-.26407-.2564-.26407-.4408v-1.5c-1.10457 0-2-.89543-2-2z"
                fill="#212121"
              />
            </svg>
            <p className="text-xs md:text-sm">{numComments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
