import BaseModel from "./BaseModel";

class ViewHeader extends BaseModel {
  constructor({
    headerId,
    viewType,
    viewId,
    caption = "",
    gradientStart = "",
    gradientEnd = "",
    defaultIcon = "",
  }) {
    super();

    this.headerId = headerId;
    this.viewType = viewType;
    this.viewId = viewId;
    this.caption = caption;
    this.defaultIcon = defaultIcon;
    this.gradientStart = gradientStart;
    this.gradientEnd = gradientEnd;
  }
}

export default ViewHeader;
