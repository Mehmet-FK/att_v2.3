import css from "@/styles/skeletons.module.css";
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

const EntitiesSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <SkeletonCard key={item} />
      ))}
    </>
  );
};

export default EntitiesSkeleton;
