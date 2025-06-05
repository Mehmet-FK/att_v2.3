import ToolMenu from "@/components/menus/ToolMenu";
import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import DeleteIcon from "@mui/icons-material/Delete";

const EntityToolMenu = ({ entityId }) => {
  const { deleteEntityCall } = useAttensamCalls();

  const toolMenuProps = [
    {
      icon: <DeleteIcon />,
      onClick: () => {
        deleteEntityCall(query?.entityId).then(() => router.push("/entities"));
      },
      buttonText: "Löschen",
    },
  ];
  if (entityId === "new") {
    return null;
  } else {
    return <ToolMenu buttonsList={toolMenuProps} />;
  }
};

export default EntityToolMenu;
