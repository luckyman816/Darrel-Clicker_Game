/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "../component/ProgressBar";
import { dispatch, useSelector } from "../store";
import soundEffect from "../../public/effect/water.wav";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import axios from "../utils/api";
import {
  insertWallet,
  updateWallet,
  updateEnergy,
  getWallet,
  updateWalletAddress,
} from "../store/reducers/wallet";
function Home() {
  const audio = new Audio(soundEffect);
  const address = useTonAddress();
  console.log("wallet address---------->", address);
  const usernameState = useSelector((state) => state.wallet.user?.username);
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const energyState = useSelector((state) => state.wallet.user?.energy);
  const tapState = useSelector((state) => state.wallet.user?.tap);
  const limitState = useSelector((state) => state.wallet.user?.limit);
  const [imgStatus, setImgStatus] = useState(false);
  const [tap, setTap] = useState<number>(tapState);
  const [username, setUsername] = useState<string>(usernameState);
  const [token, setToken] = useState<number>(tokenState);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(energyState);
  const [limit, setLimit] = useState<number>(limitState);
  useEffect(() => {
    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    // console.log("=========>webapp", webapp);
    if (webapp) {
      setUsername(webapp["user"]["username"]);
      axios.post(`/earnings/add`, { username: webapp["user"]["username"] });
      dispatch(insertWallet(webapp["user"]["username"]));
      dispatch(getWallet(webapp["user"]["username"])).then(() => {
        setTap(tapState);
        setToken(tokenState);
        setRemainedEnergy(energyState);
      });
    }
  }, []);
  useEffect(() => {
    dispatch(updateWalletAddress(username, address));
  }, [address, username])
  useEffect(() => {
    setLimit(limitState);
  }, [limitState]);
  useEffect(() => {
    dispatch(insertWallet(username));
  }, [username]);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const bodyRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState<string>(`+${tap}`);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = `${score}`;
    newDiv.style.backgroundImage = "url('image/dollar.png')";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "30px";
    newDiv.style.paddingLeft = "30px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = score == "+1" ? "#58E1E2" : "red";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("-information---->", username, remainedEnergy);
      if (remainedEnergy < limit) {
        dispatch(updateEnergy(username, remainedEnergy + 1));
      }
    }, 216000);
    return () => clearInterval(interval);
  }, [username, remainedEnergy, limit]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!address) {
      toast.warning("Wallet connection error. Please try again later.");
      return;
    }
    audio.play();
    if (remainedEnergy > 0 && token < 100000) {
      setScore(`+${tap}`);
      if (token + tap > 100000) {
        setToken(100000);
        dispatch(updateWallet(username, 100000, remainedEnergy - 1));
      } else {
        setToken(token + tap);
        dispatch(updateWallet(username, token + tap, remainedEnergy - 1));
      }
      setRemainedEnergy(remainedEnergy - 1);
      handleClick(event);
    }
  };

  const handleMouseDown = () => {
    setImgStatus(true);
  };
  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  console.log("imgStatus", imgStatus);

  return (
    <div className=" mt-8 mb-[60px]">
      <ToastContainer />
      <div className="flex justify-center items-center">
        <TonConnectButton />
      </div>
      <div
        id="mainWindow"
        className="relative mt-8 flex flex-col items-center justify-center w-full h-[62vh] mb-9"
      >
        <div className="flex flex-col justify-center items-center mb-7">
          <div className="flex justify-center items-center">
            <img src="image/money-bag.png" alt="" className=" w-5 h-5" />
            <h3 className="text-xl font-bold text-[#fff243]">
              &nbsp;&nbsp;Donald Trump
            </h3>
          </div>
          <h1 className="text-5xl text-white">
            {formatNumberWithCommas(token)}
          </h1>
        </div>
        <div>
          <img
            src="/image/white-house-back.jpg"
            alt=""
            className="absolute z-10 left-0 top-[-50px] w-[266px] h-[488px]"
          />
          <div
            className={`relative bg-[url('/image/image.png')] rounded-full bg-cover z-50 w-[400px] h-[400px] max-sm:w-[280px] max-sm:h-[280px] z-10 ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? " border-[5px]" : "border-0"}`}
            ref={bodyRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onClick={handleTap}
          />
        </div>
        <div className="flex flex-col justify-center items-center content-center ">
          <div className="flex justify-around w-full align-middle gap-5">
            <h3 className="text-xl mb-2 text-white w-[15vw]">
              <span className="text-3xl ">
                <img
                  src="/image/icon/lightning.svg"
                  alt="lightning"
                  className="w-6 h-6 inline"
                />
              </span>
              <span className="text-xl text-white">{remainedEnergy}</span> /{" "}
              {limit}
            </h3>
            <ProgressBar value={remainedEnergy / 10} />
            <div className="flex justify-center items-center w-[15vw]">
              <Link to="/boost" className="flex">
                <img
                  src="/image/rocket.png"
                  alt="rocket"
                  className="w-8 h-8 inline"
                />
                <h3 className="text-xl text-white">Boost</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
