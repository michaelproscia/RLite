import Reddit from "../utils/Reddit";

function UserAccount({ user }) {
  if (user) {
    return (
      <div className="cursor-pointer w-16 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl rounded-br-3xl border-2 border-slate-500">
        <img
          src={user.icon_img.match(/^[^?]+/)[0]}
          alt=""
          className="object-cover rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl rounded-br-3xl"
        />
      </div>
    );
  }
  return (
    <div className="cursor-pointer" onClick={() => Reddit.getAuthorization()}>
      <svg
        height="28"
        viewBox="0 0 32 32"
        width="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m16 8a5 5 0 1 0 5 5 5 5 0 0 0 -5-5zm0 8a3 3 0 1 1 3-3 3.0034 3.0034 0 0 1 -3 3z"
          fill="white"
        />
        <path
          d="m16 2a14 14 0 1 0 14 14 14.0158 14.0158 0 0 0 -14-14zm-6 24.3765v-1.3765a3.0033 3.0033 0 0 1 3-3h6a3.0033 3.0033 0 0 1 3 3v1.3765a11.8989 11.8989 0 0 1 -12 0zm13.9925-1.4507a5.0016 5.0016 0 0 0 -4.9925-4.9258h-6a5.0016 5.0016 0 0 0 -4.9925 4.9258 12 12 0 1 1 15.985 0z"
          fill="white"
        />
        <path d="m0 0h32v32h-32z" fill="none" />
      </svg>
    </div>
  );
}

export default UserAccount;
