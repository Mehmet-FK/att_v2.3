import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import css from "@/styles/workflow-forms/record-view-form.module.css";
import CheckBox from "../common-form-elements/CheckBox";
import { scannerTypeConstants } from "@/helpers/Constants";
import ScannerDialogFormBase from "./ScannerDialogFormBase";
import ViewHeaderForm from "../header-form";

const ScannerDialogForm = ({ stepID }) => {
  const { scannerDialogs } = useSelector((state) => state.workflow);

  const viewId = stepID + "-scannerdialog";

  const scannerDialog = useMemo(
    () => scannerDialogs.find((sc) => sc.scannerDialogId === viewId),
    [scannerDialogs, stepID]
  );

  const isNfcScanner = scannerDialog?.scannerType === scannerTypeConstants.NFC;

  if (isNfcScanner) {
    return (
      <ScannerDialogFormBase scannerDialog={scannerDialog} viewId={viewId}>
        <div className={css.header_form_wrapper}>
          <ViewHeaderForm viewId={viewId} />
        </div>
      </ScannerDialogFormBase>
    );
  } else {
    return <ScannerDialogFormBase scannerDialog={scannerDialog} />;
  }
};

export default ScannerDialogForm;
