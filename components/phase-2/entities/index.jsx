import css from "@/styles/entity-styles/entities.module.css";
import EntityAccordion from "@/components/phase-2/entities/EntityAccordion";
import FieldsAccordion from "@/components/phase-2/entities/FieldsAccordion";
import { useEffect } from "react";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import { useSelector } from "react-redux";
import EntityToolMenu from "./EntityToolMenu";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";

const EntityForm = ({ existingEntity }) => {
  const router = useRouter();
  const { entities } = useSelector((state) => state.attensam.data);
  const { entity } = useSelector((state) => state);

  const { restoreEntityState } = useEntityForm();
  const { postEntityCall } = useAttensamCalls();

  const [runWorker, entitiesForAutoSelect] = useAutoCompleteDataWorker(
    "/workers/prepareEntitiesWorker.js"
  );

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

  useEffect(() => {
    if (entities) {
      runWorker(entities);
    }
  }, [entities]);

  return (
    <div className={css.container}>
      <EntityToolMenu entityId={entityId} />

      <EntityAccordion entitiesForAutoSelect={entitiesForAutoSelect} />
      <FieldsAccordion entitiesForAutoSelect={entitiesForAutoSelect} />
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
