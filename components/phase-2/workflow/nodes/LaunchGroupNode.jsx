import css from "@/styles/workflow-tool-styles/workflow-tool-node-styles.module.css";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const LaunchGroupNode = () => {
  const caption = useSelector((state) => state.workflow.caption);
  const workflowId = useSelector((state) => state.workflow.workflowId);

  return (
    <div
      //   className={`${css.launch_group_node} nodrag`}
      //   className={`${css.launch_group_node} `}
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Typography
        style={{
          textTransform: "uppercase",
          width: "100%",
          borderRadius: "8px",
          wordBreak: "break-word",
          fontSize: "1rem",
          fontWeight: "500",
          color: "#444",
          backgroundColor: "#fff",
          padding: "10px",
        }}
      >
        {caption}
      </Typography>
    </div>
  );
};

export default LaunchGroupNode;
