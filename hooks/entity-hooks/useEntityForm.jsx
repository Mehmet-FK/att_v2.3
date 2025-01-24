import {
  addEntityField,
  addEntitySorting,
  addFieldProperty,
  addFieldValidation,
  changeEntityFieldValue,
  changeEntitySortingValue,
  changeEntityValue,
  changeFieldPropertyValue,
  changeFieldValidationValue,
  removeEntityField,
  removeEntitySorting,
  removeFieldProperty,
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

const entitySortingTemplate = {
  entitySortingId: "",
  entityId: "",
  fieldId: "",
  sortOrder: 1,
  sortDirection: 0,
};

const fieldPropertyTemplate = {
  listViewPropertyId: "",
  fieldID: "",
  filterValue: "",
  differingIcon: null,
  differingListviewItemIcon: "",
  priorityType: null,
  priorityText: null,
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

  const generateRandomId = (prefix, suffix) => {
    const _prefix = prefix ? prefix : "";
    const _suffix = suffix ? suffix : "";
    return `${_prefix}${
      Math.floor(Math.random() * 1000) + Date.now()
    }${_suffix}`;
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
      fieldId: generateRandomId("field-", null),
    };
    dispatch(addEntityField({ newField }));
  };
  const updateEntityFieldValue = (name, value, fieldID) => {
    dispatch(changeEntityFieldValue({ name, value, fieldID }));
  };

  const deleteEntityField = (fieldID) => {
    const sortingIdToDelete =
      findEntitySortingByFieldID(fieldID)?.entitySortingId;
    const fieldPropertyIdToDelete =
      findFieldPropertyByFieldID(fieldID)?.listViewPropertyId;
    const validationIdToDelete =
      findValidationByFieldID(fieldID)?.fieldValidationId;
    console.log({
      sortingIdToDelete,
      fieldPropertyIdToDelete,
      validationIdToDelete,
    });
    deleteEntitySorting(sortingIdToDelete);
    deleteFieldPropery(fieldPropertyIdToDelete);
    deleteFieldValidationById(validationIdToDelete);
    dispatch(removeEntityField({ fieldID }));
  };

  //! ======== VALIDATION ======== //

  const findValidationByFieldID = (fieldID) => {
    return fieldValidations?.find(
      (validation) => validation.fieldId === fieldID
    );
  };

  const createFieldValidation = (fieldID) => {
    const newValidationID = generateRandomId("validation-", null);
    const newValidation = {
      ...validationTemplate,
      fieldValidationId: newValidationID,
      fieldId: fieldID,
    };
    dispatch(addFieldValidation({ newValidation }));

    updateEntityFieldValue("validationId", newValidationID, fieldID);
  };

  const updateFieldValidationValue = (name, value, validationID) => {
    dispatch(changeFieldValidationValue({ name, value, validationID }));
  };

  const deleteFieldValidationById = (validationID) => {
    dispatch(removeFieldValidation({ validationID }));

    const assignedField = entityFields?.find(
      (field) => field.validationId === validationID
    );
    if (!assignedField?.fieldId) return;
    updateEntityFieldValue("validationId", "", assignedField.fieldId);
  };

  // const deleteFieldValidationByFieldID = (fieldID) => {
  //   const validationToDelete = fieldValidations?.find(
  //     (validation) => validation.fieldId === fieldID
  //   );

  //   deleteFieldValidationById(validationToDelete.validationId);
  // };

  //! ======== ENTITY-SORT ======== //

  const findEntitySortingByFieldID = (fieldID) => {
    return entitySortings.find((sorting) => sorting.fieldId === fieldID);
  };

  const createEntitySorting = (fieldID) => {
    const generatedSortID = generateRandomId("sort-", null);
    const newEntitySorting = {
      ...entitySortingTemplate,
      entitySortingId: generatedSortID,
      entityId,
      fieldId: fieldID,
    };

    dispatch(addEntitySorting({ newEntitySorting }));
  };

  const updateEntitySortingValue = (name, value, sortingID) => {
    console.log({ name, value, sortingID });
    dispatch(changeEntitySortingValue({ name, value, sortingID }));
  };

  const deleteEntitySorting = (sortingID) => {
    dispatch(removeEntitySorting({ sortingID }));
  };

  const deleteEntitySortingByFieldID = (fieldID) => {
    const sortingToDelete = entitySortings.find(
      (sorting) => sorting.fieldId === fieldID
    );

    deleteEntitySorting(sortingToDelete?.entitySortingId);
  };

  //! ======== FIELD-PROPERTIES ======== //

  const findFieldPropertyByFieldID = (fieldID) => {
    return fieldProperties.find((property) => property.fieldID === fieldID);
  };

  const createFieldProperty = (fieldID) => {
    const generatedPropertyID = generateRandomId("sort-", null);
    const newFieldProperty = {
      ...fieldPropertyTemplate,
      listViewPropertyId: generatedPropertyID,
      fieldID: fieldID,
    };

    dispatch(addFieldProperty({ newFieldProperty }));
  };

  const updateFieldProperyValue = (name, value, propertyID) => {
    console.log({ name, value, propertyID });
    dispatch(changeFieldPropertyValue({ name, value, propertyID }));
  };

  const deleteFieldPropery = (propertyID) => {
    dispatch(removeFieldProperty({ propertyID }));
  };

  return {
    generateRandomId,
    //ENTITY
    restoreEntityState,
    clearEntityDefinition,
    updateEntityValue,
    //ENTITY-FIELD
    createEntityField,
    updateEntityFieldValue,
    deleteEntityField,
    // VALIDATION
    createFieldValidation,
    updateFieldValidationValue,
    deleteFieldValidationById,
    //ENTITY-SORT
    createEntitySorting,
    updateEntitySortingValue,
    deleteEntitySorting,
    // FIELD-PROPERTY
    createFieldProperty,
    updateFieldProperyValue,
    deleteFieldPropery,
  };
};

export default useEntityForm;
