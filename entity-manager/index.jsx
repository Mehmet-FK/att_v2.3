import css from "@/styles/entity-styles/entities.module.css";
import EntityAccordion from "@/entity-manager/components/EntityAccordion";
import FieldsAccordion from "@/entity-manager/components/FieldsAccordion";
import { useEffect } from "react";
import useEntityForm from "@/entity-manager/hooks/useEntityForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { AutoCompleteEntityProvider } from "@/context/AutoCompleteEntityContext";
import EntityToolMenu from "./components/EntityToolMenu";

const EntityForm = ({ existingEntity }) => {
  const router = useRouter();
  const entity = useSelector((state) => state.entity);
  const { restoreEntityState } = useEntityForm();
  const { postEntityCall } = useAttensamCalls();

  const entityId = router.query?.entityId;

  const handleSubmit = () => {
    postEntityCall(entity).then((res) =>
      res ? router.push("/entities") : null
    );
  };

  useEffect(() => {
    if (existingEntity) {
      restoreEntityState(existingEntity);
    }
  }, [existingEntity]);

  return (
    <div className={css.container}>
      <EntityToolMenu entityId={entityId} />
      <AutoCompleteEntityProvider>
        <EntityAccordion />
        <FieldsAccordion />
      </AutoCompleteEntityProvider>
      <div className={css.submitBtnWrapper}>
        <Button
          className={css.submitBtn}
          onClick={handleSubmit}
          variant="contained"
        >
          submit
        </Button>
      </div>
    </div>
  );
};

export default EntityForm;
