export const environments = [
  {
    name: "Testmandant",
    url: "apl.attensam.at",
  },
  {
    name: "Echtmandant",
    url: "pro.attensam.at",
  },
];
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

export const columnTypeConstants = {
  TEXT: 0,
  VALUE: 1,
  ICON: 2,
  VARIABLE: 3,
};

export const entityFieldOptionTypes = {
  USER_DEFINED: 0,
  LOOKUP: 1,
  MULTISELECT_LOOKUP: 2,
};
