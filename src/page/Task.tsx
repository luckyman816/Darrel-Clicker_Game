import axios from "../utils/api";
import { useSelector, dispatch } from "../store";
import { updateBalance } from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function Task() {
  const username_state = useSelector((state) => state.wallet.user?.username);
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const [username, setUsername] = useState<string>(username_state);
  const [balance, setBalance] = useState<number>(balance_state);
  useEffect(() => {
    setUsername(username_state);
    setBalance(balance_state);
  }, [username_state, balance_state]);
  const handleJoinTelegramGroup = async () => {
    try {
      await axios.post(`/earnings/${username}`).then((res) => {
        if (res.data.joinTelegram.status) {
          if (!res.data.joinTelegram.earned) {
            dispatch(updateBalance(username, balance + 1000)).then(() => {
              axios.post(`/earnings/update/joinTelegram/${username}`, {
                status: true,
                earned: true,
              });
              toast.success("You have received +1000 coins successfully!");
            });
          } else {
            toast.warning("You have already received bonus!");
          }
        } else {
          toast.warning("You didn't join Telegram Group yet! Please join again");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubscribeTelegramChannel = async() => {
    try {
      await axios.post(`/earnings/${username}`).then((res) => {
        if(res.data.subscribeTelegram.status) {
          if(!res.data.subscribeTelegram.earned) {
            dispatch(updateBalance(username, balance + 1000)).then(() => {
              axios.post(`/earnings/update/subscribeTelegram/${username}`, {
                status: true,
                earned: true,
              });
              toast.success("You have received +1000 coins successfully!");
            })
          } else {
            toast.warning("You have already received bonus!");
          }
        } else {
          toast.warning("You didn't subscribe Telegram Channel yet! Please join again");
        }
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="Ranking max-w-full mx-auto text-white h-[75vh] max-sm:h-[82vh] mt-8">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <img src="image/dollar.png" alt="" className=" w-20 h-20" />
        <h2 className=" text-xl">Earn more coins</h2>
      </div>

      <div className="flex flex-col justify-center p-7">
        <div
          className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-zinc-500 rounded-[20px]"
          onClick={handleJoinTelegramGroup}
        >
          <div className="flex justify-start items-center">
            <img src="image/telegram.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Join Our TG Group
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-zinc-500 rounded-[20px]" onClick={handleSubscribeTelegramChannel}>
          <div className="flex justify-start items-center">
            <img src="image/telegram.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Subscribe Our TG Channel
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center h-24 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] hover:bg-zinc-500 rounded-[20px]">
          <div className="flex justify-start items-center">
            <img src="image/twitter.png" alt="" className=" w-14 h-14" />
            <div className=" flex flex-col justify-start">
              <div className="text-left justify-start items-center text-white ml-3 font-bold">
                Follow our X account
              </div>
              <div className="flex justify-start items-center ml-2">
                <img src="image/dollar.png" alt="" className=" w-5 h-5" />
                <span className=" text-amber-400">+1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
