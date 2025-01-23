import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = ({
  children,
  header,
  expandDefault,
  sx,
  disabled,
  headerProps,
}) => {
  return (
    <MuiAccordion
      defaultExpanded={expandDefault}
      disabled={disabled}
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
        {children}
      </MuiAccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
