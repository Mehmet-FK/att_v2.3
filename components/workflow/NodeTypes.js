import AttachmentNode from "./nodes/AttachmentNode";
import ImageCaptureNode from "./nodes/ImageCaptureNode";
import ListNode from "./nodes/ListNode";
import ModalNode from "./nodes/ModalNode";
import RecordNode from "./nodes/RecordNode";
import StartFunctionNode from "./nodes/StartFunctionNode";
import TileNode from "./nodes/TileNode";

const nodeTypes = {
  RecordView: RecordNode,
  TileView: TileNode,
  ModalDialog: ModalNode,
  CaptureImage: ImageCaptureNode,
  AttachmentView: AttachmentNode,
  ListView: ListNode,
  launch: StartFunctionNode,
};

export default nodeTypes;
