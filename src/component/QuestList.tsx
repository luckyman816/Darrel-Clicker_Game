/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "../store";
import { toast, ToastContainer } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "../utils/api";
// import { CopyToClipboard } from "react-copy-to-clipboard";
export default function QuestList() {
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  const [isCopied, setIsCopied] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);
  const [textToCopy, setTextToCopy] = useState<string>("");
  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(`https://t.me/monster_mysterybot?start=${username_state}`);
  }, [username_state]);
  const handleCopy = async () => {
    setIsCopied(true);
    toast.success("Copied to clipboard!");
  };
  useEffect(() => {
    if (username) {
      axios.post(`/friend/${username}`).then((res) => {
        setFriends(res.data);
      });
    }
  });
  console.log("friends", friends);
  console.log("textToCopy", textToCopy);
  return (
    <div className="max-h-[75vh] max-sm:max-h-[75vh] overflow-auto p-5">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-white text-3xl">Invite friends!</h1>
        <p className=" text-white">You and your friend will receive bonuses</p>
      </div>
      <div className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] rounded-[20px]">
        <div className="flex justify-start items-center">
          <img src="image/bonus.png" alt="" className=" w-14 h-14" />
          <div className=" flex flex-col justify-start">
            <div className="text-left justify-start items-center text-white ml-3 font-bold">
              Invite a friend
            </div>
            <div className="flex justify-start items-center ml-2">
              <img src="image/dollar.png" alt="" className=" w-5 h-5" />
              <span className=" text-amber-400">+200</span>
              <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] rounded-[20px]">
        <div className="flex justify-start items-center">
          <img src="image/bonus.png" alt="" className=" w-14 h-14" />
          <div className=" flex flex-col justify-start">
            <div className="text-left justify-start items-center text-white font-bold ml-3">
              Invite a friend with Telegram premium
            </div>
            <div className="flex justify-start items-center ml-2">
              <img src="image/dollar.png" alt="" className=" w-5 h-5" />
              <span className=" text-amber-400">+500</span>
              <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-white text-sm">List of your friends</h2>
        <div className=" rounded-[20px] bg-[#525252] w-full h-16 flex justify-center items-center">
          <select name="choice" className=" border-none bg-[#525252] text-sm w-[100%] mx-9 focus:border-none focus:outline-none">
            {friends.map((it) => {
              return <option value={it.friend}>{it.friend}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center align-middle w-full h-12 mt-8">
        <div className="w-[90%] h-12 bg-indigo-600 text-white rounded-[20px] flex items-center justify-center hover:bg-indigo-400">
          <span className="flex justify-center items-center">
            Invite Friend
          </span>
        </div>
        <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
          <div
            style={{
              backgroundImage: isCopied
                ? "url('image/checked.png')"
                : "url('image/link.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "40px",
              height: "40px",
            }}
          ></div>
        </CopyToClipboard>
      </div>
    </div>
  );
}
