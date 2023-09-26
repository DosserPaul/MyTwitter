const LittleUser = () => (
  <div className="flex w-full justify-between items-center gap-3">
    <img
      className="w-12 h-12 rounded-full object-center object-cover"
      src="https://shorturl.at/dKLT3"
      alt="Profile"
    />
    <div className="flex flex-col justify-center">
      <h1 className="text-text font-medium text-base">John Doe</h1>
      <h2 className="text-gray-hashtag text-sm">@johndoe</h2>
    </div>
    <button className="bg-text text-black rounded-full px-5 py-2 ml-auto cursor-pointer">
      Follow
    </button>
  </div>
);

export default LittleUser;
