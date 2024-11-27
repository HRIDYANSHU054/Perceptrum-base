import * as React from "react";
import { SVGProps } from "react";
const DrumStick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={333}
    viewBox="0 0 37.5 249.75"
    {...props}
  >
    <defs>
      <clipPath id="a">
        <path d="M8.746 3.371H25V246H8.746Zm0 0" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        fill={props.fill ?? "#393536"}
        d="M8.73 17.594c0-7.723 3.606-13.989 8.047-13.989 4.446 0 8.051 6.266 8.051 13.989 0 5.644-1.922 10.504-4.691 12.715l2.75 209.277c.047 3.46-2.711 6.285-6.11 6.285-3.394 0-6.152-2.824-6.105-6.285l2.75-209.277c-2.77-2.211-4.692-7.07-4.692-12.715"
      />
    </g>
  </svg>
);
export default DrumStick;
