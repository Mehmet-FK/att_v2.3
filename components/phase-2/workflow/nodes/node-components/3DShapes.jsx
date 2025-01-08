export const Octahedron = ({ color }) => {
  return (
    <svg
      width="102"
      height="101"
      viewBox="0 0 102 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M51.06 62.8666L101.12 50.5878L51.06 39.2534V62.8666Z"
        fill={color || "#FF0000"}
      />
      <path
        d="M1 50.5878L51.06 62.8666V39.2534L1 50.5878Z"
        fill={color || "#FF0000"}
      />
      <path
        d="M51.06 62.8666L101.12 50.5878M51.06 62.8666L1 50.5878M51.06 62.8666V100.176M51.06 62.8666V39.2534M51.06 62.8666V1M101.12 50.5878L51.06 1M101.12 50.5878L51.06 100.176M101.12 50.5878L51.06 39.2534M51.06 1L1 50.5878M51.06 1V39.2534M1 50.5878L51.06 100.176M1 50.5878L51.06 39.2534"
        stroke="black"
        stroke-opacity="0.7"
        stroke-width="0.307999"
      />
      <path
        d="M1.27137 50.5746L51.0094 1.30798V62.7537L1.27137 50.5746Z"
        fill={color || "#FF0000"}
        fill-opacity="0.5"
      />
      <path
        d="M100.942 50.5746L51.2037 1.30798V62.7537L100.942 50.5746Z"
        fill={color || "#FF0000"}
        fill-opacity="0.5"
      />
      <path
        d="M51.0498 100.009V62.9376L1.30804 50.7608L51.0498 100.009Z"
        fill={color || "#F71B1B"}
        fill-opacity="0.5"
      />
      <path
        d="M51.1459 100.104V62.9469L101.004 50.7418L51.1459 100.104Z"
        fill={color || "#F71B1B"}
        fill-opacity="0.5"
      />
    </svg>
  );
};
