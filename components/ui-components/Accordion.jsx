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
  const defaultExpanded = accordionProps?.defaultExpanded !== undefined;
  const expanded = accordionProps?.expanded !== undefined;

  const [accordionExpanded, setAccordionExpanded] = useState(
    defaultExpanded ? defaultExpanded : expanded || false
  );

  const handleExpandToggle = () => setAccordionExpanded(!accordionExpanded);

  useEffect(() => {
    if (!children) {
      setAccordionExpanded(false);
    }
  }, [children]);

  const isControlled = useMemo(
    () => accordionProps?.onChange,
    [accordionProps]
  );
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
