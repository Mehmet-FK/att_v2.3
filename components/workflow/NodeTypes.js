import AttachmentNode from "./nodes/AttachmentNode";
import ImageCaptureNode from "./nodes/ImageCaptureNode";
import ListNode from "./nodes/ListNode";
import ModalNode from "./nodes/ModalNode";
import RecordNode from "./nodes/RecordNode";
import TileNode from "./nodes/TileNode";

const nodeTypes = {
  record: RecordNode,
  tile: TileNode,
  modaldialog: ModalNode,
  captureimage: ImageCaptureNode,
  attachment: AttachmentNode,
  list: ListNode,
};

export default nodeTypes;
