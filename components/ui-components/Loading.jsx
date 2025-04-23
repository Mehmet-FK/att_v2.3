import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Loading = ({ init }) => {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(init == undefined ? true : init);
  const isLoading = useSelector((state) => state.attensam.loading);
  const previousURLRef = useRef();

  const handleStart = (url) => {
    const previousURL = previousURLRef.current;
    const isQueryChanged = url.includes("?") && previousURL?.includes("?");

    if (!isQueryChanged) {
      setIsRouting(true);
    }
  };

  const handleComplete = (url) => {
    previousURLRef.current = url;
    setTimeout(() => {
      setIsRouting(false);
    }, 300);
  };

  const handleError = (error) => {
    setTimeout(() => {
      setIsRouting(false);
    }, 300);
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

  useEffect(() => {
    setTimeout(() => {
      setIsRouting(false);
    }, 400);
  }, [router.pathname]);

  return (
    <Fade in={isRouting || isLoading} timeout={{ enter: 150, exit: 500 }}>
      <Backdrop
        sx={{
          backgroundColor: "#000000ef",
          filter: "blur(1px)",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
          margin: "-5rem",
        }}
        open={isRouting || isLoading}
      >
        <CircularProgress color="inherit" size={45} />
      </Backdrop>
    </Fade>
  );
};

export default Loading;
