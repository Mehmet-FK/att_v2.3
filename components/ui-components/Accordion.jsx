import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState } from "react";

const Accordion = ({
  children,
  header,
  accordionProps,
  headerProps,
  bodyProps,
}) => {
  const isDefaultExpandedProvided =
    accordionProps?.defaultExpanded !== undefined;
  const defaultExpanded = accordionProps?.defaultExpanded;
  const expanded = accordionProps?.expanded;
  const isControlled = accordionProps?.onChange;

  const [accordionExpanded, setAccordionExpanded] = useState(
    isDefaultExpandedProvided ? defaultExpanded : expanded || false
  );
  const handleExpandToggle = () => setAccordionExpanded(!accordionExpanded);

  useEffect(() => {
    if (!children) {
      setAccordionExpanded(false);
    }
  }, [children]);
  return (
    <MuiAccordion
      expanded={accordionExpanded}
      onChange={handleExpandToggle}
      sx={{ width: "100%" }}
      {...accordionProps}
    >
      <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...headerProps}>
        {header}
      </MuiAccordionSummary>
      <MuiAccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
        }}
        {...bodyProps}
      >
        {(isControlled ? expanded : accordionExpanded) && children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
