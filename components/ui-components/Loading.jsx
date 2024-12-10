import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Loading = ({ init }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(init == undefined ? true : init);

  const handleStart = (url) => /* url !== router.asPath && */ setLoading(true);
  const handleComplete = (url) => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  /* url === router.asPath &&  setLoading(false);*/

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [router.pathname]);

  return (
    <Fade in={loading} timeout={{ enter: 150, exit: 500 }}>
      <Backdrop
        sx={{
          backgroundColor: "#000000ef",
          filter: "blur(1px)",
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 3,
          margin: "-5rem",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" size={45} />
      </Backdrop>
    </Fade>
  );
};

export default Loading;
