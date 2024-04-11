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
export const Cube = ({ color }) => {
  return (
    <svg
      width="117"
      height="101"
      viewBox="0 0 117 101"
      fill={color}
      fill-opacity="0.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M116 50.7187H58.5L29.75 1H87.25L116 50.7187Z"
        stroke="#B8B8B8"
        stroke-width="0.819089"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M116 50.7187H58.5L29.75 100.519H87.25L116 50.7187Z"
        stroke="#B8B8B8"
        stroke-width="0.819089"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M41.4629 21.3134H75.4551L92.4921 50.7186L75.4551 80.2058H41.4629L24.4259 50.7186L41.4629 21.3134Z"
        fill={color}
        fill-opacity="1"
      />
      <path
        d="M29.75 1H87.25L116 50.7187L87.25 100.519H29.75L1 50.7187L29.75 1Z"
        stroke="#B8B8B8"
        stroke-width="0.819089"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M87.25 1L58.5 50.7187L87.25 100.519L116 50.7187L87.25 1Z"
        stroke="#B8B8B8"
        stroke-width="0.819089"
        stroke-miterlimit="10"
        stroke-linejoin="round"
      />
      <path
        d="M58.5 50.7187H1L29.75 100.519H87.25L58.5 50.7187Z"
        stroke="#B8B8B8"
        stroke-width="0.819089"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const Clover = ({ color }) => {
  return (
    <svg
      width="111"
      height="111"
      viewBox="0 0 111 111"
      fill={color}
      fill-opacity="0.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M59.7261 59.7261C128.091 128.091 -17.0913 128.091 51.2739 59.7261C-17.0913 128.091 -17.0913 -17.0913 51.2739 51.2739C-17.0913 -17.0913 128.091 -17.0913 59.7261 51.2739C128.091 -17.0913 128.091 128.091 59.7261 59.7261Z"
        stroke={color}
        stroke-opacity="1"
        stroke-width="0.819089"
      />
    </svg>
  );
};
export const ThornApple = ({ color }) => {
  return (
    <svg
      width="112"
      height="109"
      viewBox="0 0 112 109"
      fill={color}
      fill-opacity="0.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.9015 11.0286L68.3436 0L74.7643 15.333L90.7521 10.797L89.8897 27.3917L106.269 30.2427L98.2829 44.825L111.803 54.496L98.2829 64.175L106.269 78.7573L89.8897 81.6082L90.7521 98.203L74.7643 93.667L68.3436 109L55.9015 97.9714L43.4594 109L37.0388 93.667L21.0509 98.203L21.9134 81.6082L5.53425 78.7573L13.5202 64.175L0 54.496L13.5202 44.825L5.53425 30.2427L21.9134 27.3917L21.0509 10.797L37.0388 15.333L43.4594 0L55.9015 11.0286Z"
        stroke={color}
        stroke-opacity="1"
        stroke-width="0.819089"
      />
    </svg>
  );
};
export const FourLeaf = ({ color }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill={color}
      fill-opacity="0.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.3571 0H0.357145V25C0.357145 37.731 9.8733 48.2394 22.1805 49.8001C9.70075 51.201 2.11013e-06 61.789 1.09279e-06 74.643L0 99.643H25C37.731 99.643 48.2394 90.1265 49.8001 77.8195C51.201 90.2995 61.789 100 74.643 100H99.643V75C99.643 62.269 90.1265 51.7605 77.8195 50.2C90.2995 48.7992 100 38.211 100 25.3571V0.357143L75 0.357142C62.269 0.357141 51.7605 9.8733 50.2 22.1805C48.7992 9.70075 38.211 0 25.3571 0Z"
        stroke={color}
        stroke-opacity="1"
        stroke-width="0.819089"
      />
    </svg>
  );
};
export const Sun = ({ color }) => {
  return (
    <svg
      width="112"
      height="117"
      viewBox="0 0 112 117"
      fill={color}
      fill-opacity="0.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M82.585 58.5C91.3694 56.7627 100.013 52.4693 105.287 46.8275L111.274 40.4224L102.665 38.7596C95.0824 37.295 85.5662 38.9025 77.4382 42.6604C83.524 36.0912 87.9934 27.5375 88.9434 19.8734L90.0227 11.1724L82.0808 14.8873C75.0853 18.1595 68.3315 25.0532 63.9639 32.871C65.0263 23.9796 63.6147 14.4324 59.8783 7.67327L55.637 0L51.3954 7.67327C47.6593 14.4324 46.2474 23.9796 47.3097 32.871C42.9425 25.0532 36.1886 18.1592 29.1931 14.8873L21.2513 11.1724L22.3302 19.8734C23.2805 27.5375 27.7499 36.0912 33.8356 42.6604C25.7076 38.9025 16.1912 37.2953 8.60845 38.7596L0 40.4224L5.98712 46.8275C11.2608 52.4693 19.9042 56.7624 28.6889 58.5C19.9045 60.2374 11.2608 64.5302 5.98712 70.1725L0 76.5777L8.60845 78.2402C16.1912 79.7051 25.7074 78.0975 33.8356 74.3395C27.7499 80.909 23.2805 89.4623 22.3302 97.1264L21.2513 105.827L29.1928 102.113C36.1884 98.8404 42.9423 91.9468 47.3094 84.1288C46.2471 93.0203 47.659 102.567 51.3951 109.327L55.6364 117L59.8777 109.327C63.6141 102.567 65.0257 93.0203 63.9639 84.1288C68.3309 91.9468 75.0848 98.841 82.0802 102.113L90.0216 105.827L88.9428 97.1264C87.9922 89.4623 83.5228 80.909 77.4376 74.3395C85.5656 78.0975 95.0818 79.7045 102.665 78.2402L111.273 76.5777L105.286 70.1725C100.013 64.5308 91.3694 60.2374 82.585 58.5Z"
        stroke={color}
        stroke-opacity="1"
        stroke-width="0.819089"
      />
    </svg>
  );
};
