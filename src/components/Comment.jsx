function Comment({ comment }) {
  return (
    <div className="relative justify-start flex m-auto shadow shadow-slate-500 p-5 xl:p-2 xl:max-w-6xl dark:text-white dark:bg-slate-700 dark:shadow-none">
      <div className="flex">
        <p className="w-52">{comment.data.author}</p>
        <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
      </div>
      <div className="pl-6">{comment.data.body}</div>
    </div>
  );
}

export default Comment;
