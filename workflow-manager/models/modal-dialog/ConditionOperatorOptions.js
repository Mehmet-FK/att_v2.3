class ConditionOperatorOptions {
  #stringTypes = [0, 1, 10, 11, 12, 13];
  #integerTypes = [2, 3];
  #dateTypes = [5, 6, 7];

  #stringOperators = [
    {
      name: "STR_EQUALS",
      caption: "ist gleich",
    },
    {
      name: "STR_NOT_EQUALS",
      caption: "ist ungleich",
    },
    {
      name: "STR_CONTAINS",
      caption: "enthält",
    },
    {
      name: "STR_NOT_CONTAINS",
      caption: "enthält nicht",
    },
    {
      name: "STR_IS_EMPTY",
      caption: "ist leer",
    },
    {
      name: "STR_NOT_EMPTY",
      caption: "ist nicht leer",
    },
  ];

  #integerOperators = [
    {
      name: "NUM_GREATER_THAN",
      caption: "größer",
    },
    {
      name: "NUM_GREATER_THAN_OR_EQUAL",
      caption: "größer gleich",
    },
    {
      name: "NUM_LESS_THAN",
      caption: "ist kleiner",
    },
    {
      name: "NUM_LESS_THAN_OR_EQUAL",
      caption: "kleiner gleich",
    },
    {
      name: "NUM_EQUALS",
      caption: "ist gleich",
    },
    {
      name: "NUM_NOT_EQUALS",
      caption: "ist ungleich",
    },
    {
      name: "NUM_IS_EMPTY",
      caption: "ist leer",
    },
  ];
  #dateOperators = [
    {
      name: "DATE_AFTER",
      caption: "größer",
    },
    {
      name: "DATE_AFTER_OR_EQUAL",
      caption: "größer gleich",
    },
    {
      name: "DATE_BEFORE",
      caption: "ist kleiner",
    },
    {
      name: "DATE_BEFORE_OR_EQUAL",
      caption: "kleiner gleich",
    },
    {
      name: "DATE_EQUALS",
      caption: "ist gleich",
    },
    {
      name: "DATE_NOT_EQUALS",
      caption: "ist ungleich",
    },
    {
      name: "DATE_EMPTY",
      caption: "ist leer",
    },
    {
      name: "DATE_NOT_EMPTY",
      caption: "ist nicht leer",
    },
    {
      name: "DATE_TODAY",
      caption: "ist heute",
    },
  ];

  constructor(type = 0) {
    if (this.#integerTypes.includes(type)) {
      this.operators = this.#integerOperators;
    } else if (this.#dateTypes.includes(type)) {
      this.operators = this.#dateOperators;
    } else if (this.#dateTypes.includes(type)) {
      this.operators = this.#dateOperators;
    } else {
      this.operators = this.#stringOperators;
    }
  }

  get() {
    return this.operators;
  }
}

export default ConditionOperatorOptions;
