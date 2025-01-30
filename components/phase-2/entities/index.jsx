import css from "@/styles/entity-styles/entities.module.css";
import EntityAccordion from "@/components/phase-2/entities/EntityAccordion";
import FieldsAccordion from "@/components/phase-2/entities/FieldsAccordion";
import { useEffect } from "react";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import { useSelector } from "react-redux";
import EntityToolMenu from "./EntityToolMenu";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import { AutoCompleteEntityProvider } from "@/context/AutoCompleteEntityContext";

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
