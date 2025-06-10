class ConditionOperatorOptions {
  #stringTypes = [0, 1, 10, 11, 12, 13];
  #integerTypes = [2, 3];
  #dateTypes = [5, 6, 7];

  #stringOperators = [
    "ist gleich",
    "ist ungleich",
    "enthält",
    "enthält nicht",
    "ist nicht leer",
  ];

  #integerOperators = [
    "größer",
    "größer gleich",
    "kleiner",
    "kleiner gleich",
    "ist gleich",
    "ist ungleich",
    "ist leer",
  ];
  #dateOperators = [
    "größer",
    "größer gleich",
    "kleiner",
    "kleiner gleich",
    "ist gleich",
    "ist ungleich",
  ];

  constructor(type = 0) {
    if (this.#integerTypes.includes(type)) {
      this.operators = this.#integerOperators;
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
