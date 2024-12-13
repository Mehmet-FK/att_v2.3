export const settlement = [
  "Amstetten",
  "Graz",
  "Innsbruck",
  "Kalsdorf",
  "Klagenfurt",
  "Klosterneuburg",
  "Krems",
  "Leoben",
  "Linz",
  "Mödling",
  "Neusiedl",
  "Oberndorf/Kitzbühel",
  "Pinzgau",
  "Rankweil",
  "Regau",
  "Salzburg",
  "St. Pölten",
  "Völkermarkt",
  "Wien",
  "Wolfurt",
  "Wr. Neustadt",
];
export const client = [
  "Attensam",
  "Attensam Sued",
  "Attensam West",
  "Attensam Nord",
];

export const userRoles = [
  {
    id: 1,
    name: "Time",
    notes: "Timecaption",
  },
  {
    id: 2,
    name: "HrImages",
    notes: "HR Imagecaption",
  },
  {
    id: 3,
    name: "SrControl",
    notes: "SR Control",
  },
  {
    id: 4,
    name: "TWK",
    notes: "Thawn control",
  },
  {
    id: 5,
    name: "Meters",
    notes: "Meters",
  },
  {
    id: 6,
    name: "Vehicles",
    notes: "Module related to all vehicles/car functionalities",
  },
  {
    id: 7,
    name: "SrRoutes",
    notes: "SR Route",
  },
  {
    id: 8,
    name: "NFCTagActivation",
    notes: "Allowing user to activate new tags",
  },
  {
    id: 9,
    name: "TravelTime",
    notes: "Capturing travel time with order nfc tags",
  },
];

export const viewTypeConstants = {
  LISTVIEW: "ListView",
  TILEVIEW: "TileView",
  RECORDVIEW: "RecordView",
  MODALDIALOG: "ModalDialog",
  CAPTURE_IMAGE: "CaptureImage",
  ATTACHMENT_VIEW: "AttachmentView",
  SCANNER_DIALOG: "ScannerDialog",
  SCANNER_DIALOG_NFC: "ScannerDialogNFC",
  SCANNER_DIALOG_QR: "ScannerDialogQR",
  LAUNCH_DATASET_FUNCTION: "LaunchDatasetFunction",
  LAUNCH_ENTITY_FUNCTION: "LaunchEntityFunction",
  LAUNCH_MODULE: "LaunchModule",
  LAUNCH_ELEMENT_DEFAULT_FUNCTION: "LaunchElementDefaultFunction",
  LAUNCH_GROUPVIEW: "LaunchGroupView",
};

export const workflowStepTypeIds = {
  LISTVIEW: 0,
  TILEVIEW: 1,
  RECORDVIEW: 2,
  MODAL_DIALOG: 3,
  CAPTURE_IMAGE: 4,
  ATTACHMENT_VIEW: 5,
  SCANNER_DIALOG: 6,
  LAUNCH_WORKFLOW: 99,
};

export const scannerTypeConstants = {
  NFC: 0,
  QR_CODE: 1,
};

export const tableNameConstants = {
  BOOKINGS: "bookings",
  USERS: "users",
  ITEMS: "items",
};

export const contextMenuConstants = {
  HEAD: "head",
  BODY: "body",
};

export const itemTableTypeConstants = {
  ORDER: "Order",
  METER: "Meter",
  VEHICLE: "Vehicle",
};

export const pageTitleConstants = {
  BOOKINGS_TABLE: "Mobile Buchungen",
  ITEMS_TABLE: "Datensätze",
  USERS_TABLE: "Benutzer",
};
