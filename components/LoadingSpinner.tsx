
export default function LoadingSpinner() {
  const loaderStyle = {
    width: "120px",
    height: "20px",
    WebkitMask: "linear-gradient(90deg, #000 70%, transparent 0) left/20% 100%",
    background:
      "linear-gradient(#000 0 0) left -25% top 0 / 20% 100% no-repeat #ddd",
    animation: "l7 1s infinite steps(6)",
  };

  return (
    <>
    <div className="flex items-center justify-center mt-10">
      <div  style={loaderStyle}></div>
      <style>
        {`
          @keyframes l7 {
            100% {
              background-position: right -25% top 0;
            }
          }
        `}
      </style>
    </div>
    </>
  );
}
