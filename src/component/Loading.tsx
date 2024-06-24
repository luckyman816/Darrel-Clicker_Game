import "./Loading.css";
const Loading = () => {
  return (
    <div className="loader">
      <div style={{backgroundImage: "url(/image/1.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
      <div style={{backgroundImage: "url(/image/2.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
      <div style={{backgroundImage: "url(/image/3.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
      <div style={{backgroundImage: "url(/image/4.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
    </div>
  );
};

export default Loading;
