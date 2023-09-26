import LikeIcon from "@/assets/svg/LikeIcon.tsx";
import ReTweetIcon from "@/assets/svg/ReTweetIcon.tsx";
import formatNumber from "@/utils/formatNumber.ts";
import CommentIcon from "@/assets/svg/CommentIcon.tsx";

const Tweet = () => {
  return (
    <div className="w-full bg-cardBackground rounded-card relative overflow-hidden p-3">
      <div className="flex justify-between relative">
        <div className="flex gap-3">
          <img
            className={`w-14 h-14 rounded-full object-center object-cover`}
            src={`https://shorturl.at/dKLT3`}
            alt="Profile"
          />
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 items-center">
              <h1 className={`text-xl font-bold text-text`}>John Doe</h1>
              <h2 className="text-sm text-gray-hashtag">@johndoe</h2>
            </div>
            <span className="text-xs text-gray-hashtag">Few seconds ago</span>
          </div>
        </div>
        <div className="flex gap-1 absolute right-4 top-4 cursor-pointer hover:text-gray-hashtag transition">
          <div className="w-1 h-1 bg-text rounded-full"></div>
          <div className="w-1 h-1 bg-text rounded-full"></div>
          <div className="w-1 h-1 bg-text rounded-full"></div>
        </div>
      </div>
      <div className="ml-[70px] mt-3">
        <p className="text-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
        </p>
      </div>
      <div className="mt-4 ml-[70px] flex gap-1 items-center">
        <div className="w-full flex justify-between">
          <div className="flex gap-1 items-center">
            <div className="bg-like rounded-full w-4 h-4 flex justify-center items-center">
              <LikeIcon size={13}/>
            </div>
            <div className="bg-reTweet rounded-full w-4 h-4 flex justify-center items-center">
              <ReTweetIcon size={13}/>
            </div>
            <p className="ml-1 text-sm text-gray-hashtag">{formatNumber(1234)}</p>
          </div>
          <p className="ml-1 text-sm text-gray-hashtag">Comment {formatNumber(1234)}</p>
        </div>
      </div>
      <div className="ml-[70px] mt-3 flex justify-between gap-6">
        <button
          className="flex gap-1 justify-center items-center rounded-[10px] w-full py-3 text-white text-sm hover:bg-like transition bg-searchBarBackground"
        >
          <LikeIcon size={25}/>
          Like
        </button>

        <button
          className="flex gap-1 justify-center items-center rounded-[10px] w-full py-3 text-white text-sm hover:bg-reTweet transition bg-searchBarBackground"
        >
          <ReTweetIcon size={25}/>
          Re-Tweet
        </button>

        <button
          className="flex gap-1 justify-center items-center rounded-[10px] w-full py-3 text-white text-sm hover:bg-comment transition bg-searchBarBackground"
        >
          <CommentIcon size={25}/>
          Comment
        </button>
      </div>
    </div>
  )
}

export default Tweet
