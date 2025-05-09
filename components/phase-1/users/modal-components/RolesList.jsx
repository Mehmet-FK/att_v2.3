import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@/components/ui-components/Accordion";

const nfcRoleDefinitions = [
  {
    id: "NFC_1",
    caption: "Zeiterfassung",
    icon: "https://apl.attensam.at/icons/Zeiterfassung_module.png",
    workflows: null,
  },
  {
    id: "NFC_2",
    caption: "HR Bilderfassung",
    icon: "https://apl.attensam.at/icons/HR_Images_module.png",
    workflows: null,
  },
  {
    id: "NFC_3",
    caption: "SR Kontrolle",
    icon: "https://apl.attensam.at/icons/SR_Controll_module.png",
    workflows: null,
  },
  {
    id: "NFC_4",
    caption: "TWK",
    icon: "https://apl.attensam.at/icons/TWK_module.png",
    workflows: null,
  },
  {
    id: "NFC_5",
    caption: "Zähler",
    icon: "https://apl.attensam.at/icons/Meters_module.png",
    workflows: null,
  },
  {
    id: "NFC_6",
    caption: "KFZ",
    icon: "https://apl.attensam.at/icons/Vehicle_module.png",
    workflows: null,
  },
  {
    id: "NFC_7",
    caption: "SR Routen",
    icon: "https://apl.attensam.at/icons/SR_Routes_module.png",
    workflows: null,
  },
  {
    id: "NFC_8",
    caption: "NFC Tag Aktivierung",
    icon: "https://apl.attensam.at/icons/Ic_GF Erfassung@XHDPI.png",
    workflows: null,
  },
  {
    id: "NFC_9",
    caption: "Wegzeit",
    icon: "https://apl.attensam.at/icons/TravelTime_module.png",
    workflows: null,
  },
  {
    id: "NFC_10",
    caption: "Kontrollgang",
    icon: "https://apl.attensam.at/icons/Kontrollgang_Modul_Icon.png",
    workflows: null,
  },
];

const WfSection = ({ workflow, data, roleIds, setInputVal }) => {
  const subWorkflows = workflow.workflows;
  const [expanded, setExpanded] = useState(false);
  const user = useSelector((state) => state.settings.user);

  const checkAllSubWorkflows = (workflow, idArray) => {
    const subWorkflows = workflow.workflows;

    idArray.push(workflow.id);

    if (subWorkflows) {
      for (let i = 0; i < subWorkflows.length; i++) {
        checkAllSubWorkflows(subWorkflows[i], idArray);
      }
    }

    return idArray;
  };

  const expandAccordion = (e) => {
    // e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.checked) {
      const checkedIDs = checkAllSubWorkflows(workflow, new Array());
      setInputVal((pre) => ({
        ...pre,
        roleIds: Array.from(new Set([...pre.roleIds, ...checkedIDs])),
      }));
    } else {
      setInputVal((pre) => ({
        ...pre,
        roleIds: [
          ...pre.roleIds.filter(
            (x) => !checkAllSubWorkflows(workflow, new Array()).includes(x)
          ),
        ],
      }));
    }
  };

  const accordionIcon = useMemo(
    () =>
      subWorkflows && (
        <IconButton onClick={expandAccordion} aria-label="expand">
          <ArrowDropDownIcon />
        </IconButton>
      ),
    [subWorkflows]
  );

  return (
    <>
      <Accordion
        accordionProps={{
          defaultExpanded: false,
          expanded: expanded,
          onChange: expandAccordion,
        }}
        headerProps={{
          sx: { height: "2rem" },
          expandIcon: accordionIcon,
        }}
        bodyProps={{ sx: { padding: "10px" } }}
        header={
          <FormControlLabel
            sx={{ width: "100%" }}
            onClick={(e) => e.preventDefault()}
            control={
              <Checkbox
                value={workflow.id}
                name={workflow.caption}
                disabled={!user?.isAdministrator}
                checked={roleIds?.includes(workflow.id) || false}
                onClick={handleClick}
              />
            }
            label={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  columnGap: "5px",
                }}
              >
                <img
                  src={workflow.icon}
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
                <p>{workflow.caption}</p>
              </div>
            }
          />
        }
        aria-controls={`${workflow.id}-header`}
        id={`${workflow.id}-header`}
      >
        {subWorkflows?.map((swf) => {
          return (
            <WfSection
              key={swf?.id}
              workflow={swf}
              data={data}
              roleIds={roleIds}
              setInputVal={setInputVal}
            />
          );
        })}
      </Accordion>
    </>
  );
};

const RolesList_phase2 = ({ inputVal, setInputVal }) => {
  const userRoles = useSelector((state) => state.attensam.data?.userRoles);

  const roleIds = inputVal.roleIds;

  return (
    <div style={{ padding: 0 }}>
      {nfcRoleDefinitions.map((item) => (
        <WfSection
          key={item?.id}
          workflow={item}
          data={nfcRoleDefinitions}
          roleIds={roleIds}
          setInputVal={setInputVal}
        />
      ))}

      {userRoles.map((item) => (
        <WfSection
          key={item?.id}
          workflow={item}
          data={userRoles}
          roleIds={roleIds}
          setInputVal={setInputVal}
        />
      ))}
    </div>
  );
};

export default RolesList_phase2;
