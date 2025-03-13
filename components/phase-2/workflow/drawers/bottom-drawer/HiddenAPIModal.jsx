import useAttensamCalls from "@/hooks/remote-api-hooks/useAttensamCalls";
import css from "@/styles/workflow-forms-styles/record-view-form.module.css";
import { LoadingButton } from "@mui/lab";
import { Button, Card, CardContent, Modal, TextField } from "@mui/material";
import { useState } from "react";

const HiddenAPIModal = ({ open, setOpen }) => {
  const [response, setResponse] = useState(null);
  const [endpoint, setEndpoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getAttData } = useAttensamCalls();

  const fetchData = async () => {
    if (!endpoint) return;
    setIsLoading(true);
    getAttData(endpoint, null, false)
      .then((res) => setResponse(JSON.stringify(res, null, 2)))
      .then(() => setIsLoading(false));
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className={css.card}>
        <CardContent className={css.content}>
          <div
            className={css.flex_column}
            style={{
              minHeight: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              className={css.flex_column}
              style={{ height: "100%", justifyContent: "space-between" }}
            >
              <TextField
                size="small"
                label="Response"
                value={response || ""}
                name="caption"
                variant="outlined"
                fullWidth
                multiline
                rows={38}
              />
              <TextField
                label="Endpoint"
                value={endpoint || ""}
                placeholder="https://apl.attensam.at"
                name="caption"
                variant="outlined"
                onChange={(e) => setEndpoint(e.target.value)}
                fullWidth
              />
            </div>

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              type="submit"
              fullWidth
              variant="contained"
              onClick={fetchData}
            >
              Submit
            </LoadingButton>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default HiddenAPIModal;
