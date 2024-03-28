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
export const Diamond = ({ color }) => {
  return (
    <svg width="100" height="100">
      <g transform="translate(2, 2)">
        <path
          d="M0,48 L48,0 L96,48 L48,96 Z"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></path>
      </g>
    </svg>
  );
};
export const Parallelogram = ({ color }) => {
  return (
    <svg width="130" height="70">
      <g transform="translate(2, 2)">
        <path
          d="M0,66 L31.5,0 L126,0 L94.5,66 Z"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></path>
      </g>
    </svg>
  );
};
export const Plus = ({ color }) => {
  return (
    <svg width="110" height="110" class="shape-svg">
      <g transform="translate(2, 2)">
        <path
          d="M35.333333333333336,0 L70.66666666666666,0 L70.66666666666666,35.333333333333336 L106,35.333333333333336 L106,70.66666666666666 L106,70.66666666666666 L70.66666666666666,70.66666666666666 L70.66666666666666,106 L70.66666666666666,106 L35.333333333333336,106 L35.333333333333336,70.66666666666666 L0,70.66666666666666 L0,35.333333333333336 L35.333333333333336,35.333333333333336 Z"
          fill={color}
          stroke-width="2"
          stroke={color}
          fill-opacity="0.8"
        ></path>
      </g>
    </svg>
  );
};
