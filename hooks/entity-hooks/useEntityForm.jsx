import {
  addEntityField,
  addFieldValidation,
  changeEntityFieldValue,
  changeEntityValue,
  removeEntityField,
  removeFieldValidation,
  setEntityToInitial,
  updateTotalEntity,
} from "@/redux/slices/entitySlice";
import { useDispatch, useSelector } from "react-redux";

const fieldTemplate = {
  fieldId: "",
  entityId: "new",
  linkedEntityId: "",
  name: "",
  caption: "",
  type: 0,
  dataSourceColumn: "",
  showMobile: true,
  validationId: "",
  isReadOnly: true,
  maxLength: null,
  decimalPlaces: null,
  showByDefault: true,
  groupName: "Allgemein",
};

const validationTemplate = {
  fieldValidationId: "",
  fieldId: "",
  pattern: "",
  minDate: null,
  maxDate: null,
  regex: null,
  minValue: null,
  maxValue: null,
  isReadOnly: false,
  maxLength: null,
  showByDefault: true,
  required: null,
};

const useEntityForm = () => {
  const dispatch = useDispatch();
  const entity = useSelector((state) => state.entity);

  const {
    entityId,
    entityFields,
    fieldValidations,
    entitySortings,
    fieldOptions,
    fieldProperties,
  } = entity;

  const generateRandomId = (prefix) => {
    return `${prefix}-${Math.floor(Math.random() * 1000) + Date.now()}`;
  };

  //! ======== ENTITY ======== //

  const clearEntityDefinition = () => {
    dispatch(setEntityToInitial());
  };

  const restoreEntityState = (entity) => {
    if (entity?.length) {
      dispatch(updateTotalEntity({ entity: entity[0] }));
    } else {
      clearEntityDefinition();
    }
  };

  const updateEntityValue = (name, value) => {
    dispatch(changeEntityValue({ name, value }));
  };

  //! ======== FIELD ======== //

  const createEntityField = () => {
    const newField = {
      ...fieldTemplate,
      entityId,
      fieldId: generateRandomId("field"),
    };
    dispatch(addEntityField({ newField }));
  };
  const updateEntityFieldValue = (name, value, fieldID) => {
    dispatch(changeEntityFieldValue({ name, value, fieldID }));
  };

  const deleteEntityField = (fieldID) => {
    dispatch(removeEntityField({ fieldID }));
    const assignedValidation = fieldValidations?.find(
      (validation) => validation.fieldId === fieldID
    );

    if (!assignedValidation) return;

    dispatch(
      removeFieldValidation({ validationID: assignedValidation.validationId })
    );
  };

  //! ======== VALIDATION ======== //

  const createFieldValidation = (fieldID) => {
    const newValidationID = generateRandomId("validation");
    const newValidation = {
      ...validationTemplate,
      fieldValidationId: newValidationID,
      fieldId: fieldID,
    };
    console.log(newValidation);
    dispatch(addFieldValidation({ newValidation }));
  };

  const updateFieldValidationValue = (name, value, validationID) => {
    dispatch(changeEntityFieldValue({ name, value, validationID }));
  };

  const deleteFieldValidationById = (validationID) => {
    dispatch(removeFieldValidation({ validationID }));

    const assignedField = entityFields?.find(
      (field) => field.validationId === validationID
    );
    if (!assignedField.fieldId) return;
    updateEntityFieldValue("validationId", "", assignedField.fieldId);
  };

  return {
    restoreEntityState,
    clearEntityDefinition,
    updateEntityValue,

    createEntityField,
    updateEntityFieldValue,
    deleteEntityField,

    createFieldValidation,
    updateFieldValidationValue,
    deleteFieldValidationById,
  };
};

export default useEntityForm;
