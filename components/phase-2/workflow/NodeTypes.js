import AttachmentNode from "./nodes/AttachmentNode";
import ImageCaptureNode from "./nodes/ImageCaptureNode";
import ListNode from "./nodes/ListNode";
import ModalNode from "./nodes/ModalNode";
import RecordNode from "./nodes/RecordNode";
import ScannerDialogNFC from "./nodes/ScannerDialogNFC";
import ScannerDialogQR from "./nodes/ScannerDialogQR";
import StartFunctionNode from "./nodes/StartFunctionNode";
import TileNode from "./nodes/TileNode";

const nodeTypes = {
  ListView: ListNode,
  RecordView: RecordNode,
  TileView: TileNode,
  ModalDialog: ModalNode,
  CaptureImage: ImageCaptureNode,
  AttachmentView: AttachmentNode,
  ScannerDialogQR: ScannerDialogQR,
  ScannerDialogNFC: ScannerDialogNFC,
  launch: StartFunctionNode,
};

export default nodeTypes;
