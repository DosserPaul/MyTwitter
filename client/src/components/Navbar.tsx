import logo from '../assets/img/twitter-logo.png';
import HomeIcon from "@/assets/svg/HomeIcon.tsx";
import MessageIcon from "@/assets/svg/MessageIcon.tsx";
import NotifIcon from "@/assets/svg/NotifIcon.tsx";
import DownArrow from "@/assets/svg/DownArrow.tsx";

const NavBar = () => {
  return (
    <div className="flex justify-between px-11 py-2 items-center">
      <div className="flex">
        <img src={logo} alt="Twitter Logo"/>
        <input
          type="text"
          placeholder="# Explore"
          className="rounded-2xl bg-searchBarBackground py-1.5 px-4 text-text outline-none ml-4"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-black bg-text rounded-card px-1.5 py-1 cursor-pointer">
            <HomeIcon/> Home
          </div>
          <MessageIcon/>
          <NotifIcon/>
        </div>
        <div className="w-px bg-gray-border"></div>
        <div className="flex gap-2 items-center text-white rounded-[20px] bg-cardBackground py-1.5 px-2 cursor-pointer">
          <img
            className={`w-7 h-7 rounded-full object-center object-cover`}
            src={`https://shorturl.at/dKLT3`}
            alt="Profile"
          />
          <p>John Doe</p>
          <DownArrow />
        </div>
      </div>
    </div>
  )
}

export default NavBar
