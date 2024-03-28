export const Circle = ({ color }) => {
  return (
    <svg width="100" height="100">
      <g transform="translate(2, 3)">
        <ellipse
          cx="48"
          cy="48"
          rx="48"
          ry="48"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></ellipse>
      </g>
    </svg>
  );
};
export const Triangle = ({ color }) => {
  return (
    <svg width="110" height="88">
      <g transform="translate(2, 2)">
        <path
          d="M0,85 L52,0 L105,85 Z"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></path>
      </g>
    </svg>
  );
};
export const ArrowRectangle = ({ color }) => {
  return (
    <svg width="140" height="60">
      <g transform="translate(2, 2)">
        <path
          d="M0,0 L122.4,0 L136,28 L122.4,56 L0,56 Z"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></path>
      </g>
    </svg>
  );
};
export const Cylinder = ({ color }) => {
  return (
    <svg width="100" height="100">
      <g transform="translate(2, 2)">
        <path
          d="M0,12  L 0,84 A 48 12 0 1 0 96 84 L 96,12 A 48 12 0 1 1 0 12 A 48 12 0 1 1 96 12 A 48 12 0 1 1 0 12 z"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></path>
      </g>
    </svg>
  );
};
