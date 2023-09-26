import Profile from "@/components/Profile.tsx";
import WhoFollow from "@/components/WhoFollow.tsx";
import Navbar from "@/components/Navbar.tsx";
import AddTweet from "@/components/AddTweet.tsx";
import Tweet from "@/assets/svg/Tweet.tsx";
import Tendency from "@/components/Tendency.tsx";

const App = () => {
  return (
    <div className="w-full h-screen bg-mainBackground overflow-hidden">
      <Navbar/>
      <div className=" flex p-3 gap-3">
        <div className="w-1/4 flex flex-col gap-3">
          <Profile/>
          <WhoFollow/>
        </div>

        <div className="w-1/2 flex flex-col gap-3">
          <AddTweet/>
          <Tweet />
          <Tweet />
          <Tweet />
        </div>

        <div className="w-1/4 flex-col gap-3">
          <Tendency/>
        </div>
      </div>
    </div>
  )
}

export default App
