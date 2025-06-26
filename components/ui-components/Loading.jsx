import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(false);
  const isLoading = useSelector((state) => state.attensam.loading);

  const handleStart = (url) => {
    const isOnlyQueryChanged = url.includes("?"); //&& !previousURL?.includes("?");

    if (!isOnlyQueryChanged) {
      setIsRouting(true);
    }
  };

  const handleComplete = (url) => {
    setTimeout(() => {
      setIsRouting(false);
    }, 300);
  };

  const handleError = (error, url) => {
    if (!error.cancelled) {
      setTimeout(() => {
        setIsRouting(false);
      }, 300);
    }
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  });

  const animationTimeout = { enter: 150, exit: 500 };
  return (
    <Fade in={isRouting || isLoading} timeout={animationTimeout}>
      <Backdrop
        sx={{
          backgroundColor: "#000000ef",
          filter: "blur(1px)",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
          margin: "-5rem",
        }}
        timeout={animationTimeout}
        open={isRouting || isLoading}
      >
        <CircularProgress color="inherit" size={45} />
      </Backdrop>
    </Fade>
  );
};

export default Loading;
