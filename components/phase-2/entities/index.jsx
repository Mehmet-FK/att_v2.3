import css from "@/styles/entities.module.css";
import EntityAccordion from "@/components/phase-2/entities/EntityAccordion";
import FieldsAccordion from "@/components/phase-2/entities/FieldsAccordion";
import { useEffect } from "react";
import useEntityForm from "@/hooks/entity-hooks/useEntityForm";
import useAutoCompleteDataWorker from "@/hooks/worker-hooks/useAutoCompleteDataWorker";
import { useSelector } from "react-redux";
import EntityToolMenu from "./EntityToolMenu";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const EntityForm = ({ existingEntity }) => {
  const router = useRouter();
  const { entities } = useSelector((state) => state.attensam.data);

  const { restoreEntityState } = useEntityForm();

  const [runWorker, entitiesForAutoSelect] = useAutoCompleteDataWorker(
    "/workers/prepareEntitiesWorker.js"
  );

  const entityId = router.query?.entityId;

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
        <Button className={css.submitBtn} variant="contained" type="submit">
          submit
        </Button>
      </div>
    </div>
  );
};

export default EntityForm;
