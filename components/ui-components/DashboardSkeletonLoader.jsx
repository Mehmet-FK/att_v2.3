import css from "@/styles/skeletons.module.css";
import { Fade } from "@mui/material";
import { useSelector } from "react-redux";
const SkeletonCard = () => {
  return (
    <div className={css.box}>
      <div className={css.skeleton}>
        <div className={css.skeleton_left}>
          <div className={`${css.line} ${css.h17} ${css.w40} ${css.m10}`}></div>
          <div className={css.line}></div>
          <div className={`${css.line} ${css.h8} ${css.w50}`}></div>
          <div className={`${css.line} ${css.w75}`}></div>
        </div>
        <div className={css.skeleton_right}>
          <div className={`${css.square} ${css.circle}`}></div>
        </div>
      </div>
    </div>
  );
};

const DashboardSkeletonLoader = () => {
  const { loading } = useSelector((state) => state.attensam);
  const mockArray = Array(25).fill(null);

  return (
    <Fade in={loading} timeout={{ enter: 150, exit: 500 }} unmountOnExit>
      <div className={css.gridContainer}>
        {mockArray.map((item, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </Fade>
  );
};

export default DashboardSkeletonLoader;
