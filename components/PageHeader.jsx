import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h3>
        <em style={{ textTransform: "uppercase" }}>{title} </em>
      </h3>
    </div>
  );
};

export default PageHeader;
