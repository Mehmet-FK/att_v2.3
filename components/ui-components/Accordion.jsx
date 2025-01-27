import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const Accordion = ({
  children,
  header,
  expandDefault,
  sx,
  disabled,
  headerProps,
}) => {
  const [accordionExpanded, setAccordionExpanded] = useState(
    expandDefault || false
  );

  const handleExpandToggle = () => setAccordionExpanded(!accordionExpanded);

  return (
    <MuiAccordion
      defaultExpanded={expandDefault}
      disabled={disabled}
      onChange={handleExpandToggle}
      sx={sx ? sx : {}}
    >
      <MuiAccordionSummary {...headerProps} expandIcon={<ExpandMoreIcon />}>
        {header}
      </MuiAccordionSummary>
      <MuiAccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
        }}
      >
        {accordionExpanded && children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
