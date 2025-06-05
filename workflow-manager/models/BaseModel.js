class BaseModel {
  generateId(prefix, suffix) {
    const _prefix = prefix ? prefix : "";
    const _suffix = suffix ? suffix : "";
    return `${_prefix}${
      Math.floor(Math.random() * 1000) + Date.now()
    }${_suffix}`;
  }
  /**
   * Extract the Object properties to be stored in redux
   * @returns Plain Object
   */
  toObject() {
    const obj = {};
    for (const key in this) {
      if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
        obj[key] = this[key];
      }
    }
    return obj;
  }
}
export default BaseModel;
