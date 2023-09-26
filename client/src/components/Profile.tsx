import formatNumber from "@/utils/formatNumber.ts";

const Profile = () => {
  return (
    <div className="w-full bg-cardBackground rounded-card relative overflow-hidden">
      <div className={`relative mb-[60px]`}>
        <img
          className={`w-full h-28 object-center object-cover`}
          src="https://shorturl.at/vxL14"
          alt="Banner"
        />
        <img
          className={`w-[125px] h-[125px] absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full object-center object-cover`}
          src={`https://shorturl.at/dKLT3`}
          alt="Profile"
        />
      </div>
      <div className="p-4 text-center">
        <h1 className={`text-xl font-bold text-text`}>John Doe</h1>
        <h2 className="text-sm text-gray-hashtag pb-4">@johndoe</h2>
        <p className="text-sm text-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
        </p>
      </div>
      <div>
        <div className="w-full h-px bg-gray-border"></div>
        <div>
          <div className="grid grid-cols-11 text-center p-3">
            <div className="col-span-5">
              <h2 className="text-xl text-text">{formatNumber(3214)}</h2>
              <h1 className="text-sm text-gray-hashtag">Followers</h1>
            </div>
            <div className="w-full col-span-1 flex justify-center">
              <div className="w-px h-full bg-gray-border col-span-1"></div>
            </div>
            <div className="col-span-5">
              <h2 className="text-xl text-text">{formatNumber(1234)}</h2>
              <h1 className="text-sm text-gray-hashtag">Following</h1>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gray-border"></div>
      </div>
      <div className="text-center p-3.5">
        <p className="text-link cursor-pointer text-sm">My Profile</p>
      </div>
    </div>
  )
}

export default Profile
