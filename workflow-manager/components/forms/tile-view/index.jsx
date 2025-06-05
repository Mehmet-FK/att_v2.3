import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms-styles/list-view-form.module.css";
import ViewHeaderForm from "../header";

const TileViewForm = () => {
  const workflowId = useSelector((state) => state.workflow.workflowId);

  return (
    <div className={css.form_container}>
      <div className={css.header_form_wrapper}>
        <ViewHeaderForm viewId={workflowId} defaultExpanded={true} />
      </div>
    </div>
  );
};

export default TileViewForm;
