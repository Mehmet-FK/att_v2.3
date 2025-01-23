import { createSlice } from "@reduxjs/toolkit";

const _initialState = {
  entityId: "new",
  name: "",
  caption: "",
  dataSource: "",
  dataSourceType: 0,
  isSystemEntity: false,
  fileSource: "",
  maxResults: null,
  defaultIconPath: null,
  parentEntityId: null,
  entityFields: [],
  entitySortings: [],
  fieldValidations: [],
  fieldOptions: [],
  fieldProperties: [],
};
const entitySlice = createSlice({
  name: "entity",
  initialState: _initialState,
  reducers: {
    setEntityToInitial: () => _initialState,

    updateTotalEntity: (state, { payload: { entity } }) => {
      for (const key in entity) {
        state[key] = entity[key];
      }
    },

    changeEntityValue: (state, { payload: { name, value } }) => {
      if (state[name] !== value) {
        state[name] = value;
      }
    },
    addEntityField: (state, { payload: { newField } }) => {
      state.entityFields.push(newField);
    },

    changeEntityFieldValue: (state, { payload: { name, value, fieldID } }) => {
      state.entityFields = state.entityFields.map((field) => {
        if (field.fieldId === fieldID) {
          return { ...field, [name]: value };
        } else {
          return field;
        }
      });
    },

    removeEntityField: (state, { payload: { fieldID } }) => {
      state.entityFields = state.entityFields.filter(
        (field) => field.fieldId !== fieldID
      );
    },

    addFieldValidation: (state, { payload: { newValidation } }) => {
      state.fieldValidations.push(newValidation);
    },

    changeFieldValidationValue: (
      state,
      { payload: { name, value, validationID } }
    ) => {
      state.fieldValidations = state.fieldValidations.map((validation) => {
        if (validation.fieldValidationId === validationID) {
          return { ...validation, [name]: value };
        } else {
          return validation;
        }
      });
    },

    removeFieldValidation: (state, { payload: { validationID } }) => {
      state.fieldValidations = state.fieldValidations.filter(
        (validation) => validation.fieldValidationId !== validationID
      );
    },

    addEntitySorting: (state, { payload: { newEntitySorting } }) => {
      state.entitySortings.push(newEntitySorting);
    },

    changeEntitySortingValue: (
      state,
      { payload: { name, value, sortingID } }
    ) => {
      state.entitySortings = state.entitySortings.map((sortingRule) => {
        if (sortingRule.entitySortingId === sortingID) {
          return { ...sortingRule, [name]: value };
        } else {
          return sortingRule;
        }
      });
    },

    removeEntitySorting: (state, { payload: { sortingID } }) => {
      console.log(sortingID);
      state.entitySortings = state.entitySortings.filter(
        (sortingRule) => sortingRule.entitySortingId !== sortingID
      );
    },

    addFieldProperty: (state, { payload: { newFieldProperty } }) => {
      state.fieldProperties.push(newFieldProperty);
    },

    changeFieldPropertyValue: (
      state,
      { payload: { name, value, propertyID } }
    ) => {
      state.fieldProperties = state.fieldProperties.map((fieldProperty) => {
        if (fieldProperty.listViewPropertyId === propertyID) {
          return { ...fieldProperty, [name]: value };
        } else {
          return fieldProperty;
        }
      });
    },

    removeFieldProperty: (state, { payload: { propertyID } }) => {
      state.fieldProperties = state.fieldProperties.filter(
        (fieldProperty) => fieldProperty.listViewPropertyId !== propertyID
      );
    },
  },
});

export const {
  //ENTITY
  setEntityToInitial,
  updateTotalEntity,
  changeEntityValue,
  //FIELD
  addEntityField,
  changeEntityFieldValue,
  removeEntityField,
  //VALIDATION
  addFieldValidation,
  changeFieldValidationValue,
  removeFieldValidation,
  // ENTITY-SORT
  addEntitySorting,
  changeEntitySortingValue,
  removeEntitySorting,
  // FIELD-PROPERTY
  addFieldProperty,
  changeFieldPropertyValue,
  removeFieldProperty,
} = entitySlice.actions;
export default entitySlice.reducer;
