import defaultSubredditIcon from "../assets/defaultSubredditIcon.svg";
import { NavLink } from "react-router-dom";

function SubredditNav({ subreddits }) {
  return (
    <div className="bg-slate-400 w-80 p-6 self-end  text-center mb-4 absolute right-0 top-0 dark:text-white dark:bg-slate-900 z-10">
      <h2 className="text-2xl font-bold mb-8">Subreddits</h2>
      {subreddits.map((subreddit) => (
        <NavLink
          to={`/${subreddit.data.display_name_prefixed.split("/")[1]}`}
          key={subreddit.data.id}
          className={({ isActive }) =>
            isActive ? "text-blue-800 dark:text-blue-500" : ""
          }
        >
          <div className="text-lg mt-6 flex flex-nowrap font-semibold cursor-pointer">
            {subreddit.data.icon_img ? (
              <img
                className="h-8 rounded-2xl inline mr-2 border-2 border-slate-700
              cursor-pointer"
                src={subreddit.data.icon_img}
              />
            ) : (
              <img
                className="h-8 rounded-2xl inline mr-2 border-2 border-slate-700
              cursor-pointer"
                src={defaultSubredditIcon}
              />
            )}
            {subreddit.data.display_name_prefixed}
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default SubredditNav;
