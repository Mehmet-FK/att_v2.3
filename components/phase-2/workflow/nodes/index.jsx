import { viewTypeConstants } from "@/helpers/Constants";
import {
  AttachmentShape,
  ImageShape,
  LaunchDatasetShape,
  LaunchDefaultListViewShape,
  LaunchDefaultShape,
  LaunchEntityShape,
  LaunchGroupShape,
  LaunchModuleShape,
  ListShape,
  LoopElementShape,
  ModalShape,
  NFCScannerShape,
  QRScannerShape,
  RecordShape,
  TileShape,
} from "./node-components/Shapes";
import NodeBase from "./NodeBase";

const nodeShapes = {
  ListView: <ListShape />,
  TileView: <TileShape />,
  RecordView: <RecordShape />,
  ModalDialog: <ModalShape />,
  CaptureImage: <ImageShape />,
  AttachmentView: <AttachmentShape />,
  ScannerDialogNFC: <NFCScannerShape />,
  ScannerDialogQR: <QRScannerShape />,
  // For the future implementations
  // LoopElement: <LoopElementShape />,
  LaunchDatasetFunction: <LaunchDatasetShape />,
  LaunchEntityFunction: <LaunchEntityShape />,
  LaunchModule: <LaunchModuleShape />,
  LaunchElementDefaultFunction: <LaunchDefaultShape />,
  LaunchGroupView: <LaunchGroupShape />,
  LaunchDefaultListView: <LaunchDefaultListViewShape />,
};

const Nodes = ({ data, isConnectable }) => {
  const nodeType = data?.type;
  const shape = nodeShapes[nodeType];

  return <NodeBase data={data} isConnectable={isConnectable} shape={shape} />;
};

export default Nodes;
