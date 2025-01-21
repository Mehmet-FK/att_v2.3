import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = ({ children, header, expandDefault, sx }) => {
  return (
    <>
      <MuiAccordion defaultExpanded={expandDefault}>
        <MuiAccordionSummary
          sx={
            sx
              ? sx
              : { fontSize: "1.2rem", fontWeight: "500", paddingBlock: "1rem" }
          }
          expandIcon={<ExpandMoreIcon />}
        >
          {header}
        </MuiAccordionSummary>
        <MuiAccordionDetails
          sx={{ display: "flex", flexDirection: "column", rowGap: "0.5rem" }}
        >
          {children}
        </MuiAccordionDetails>
      </MuiAccordion>
    </>
  );
};

export default Accordion;
