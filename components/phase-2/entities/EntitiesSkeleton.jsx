import css from "@/styles/skeletons.module.css";
const SkeletonCard = () => {
  return (
    <div className={"skel_box"}>
      <div className={"skel_skeleton"}>
        <div className={"skel_skeleton_left"}>
          <div
            className={`${"skel_line"} ${"skel_h17"} ${"skel_w40"} ${"skel_m10"}`}
          ></div>
          <div className={"skel_line"}></div>
          <div className={`${"skel_line"} ${"skel_h8"} ${"skel_w50"}`}></div>
          <div className={`${"skel_line"} ${"skel_w75"}`}></div>
        </div>
        <div className={"skel_skeleton_right"}>
          <div className={`${"skel_square"} ${"skel_circle"}`}></div>
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
