import {SVGProps} from "react";

export function UfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        color="currentColor"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M7 8c-2.989.556-5 1.595-5 2.785C2 12.56 6.477 14 12 14s10-1.44 10-3.215c0-1.19-2.011-2.23-5-2.785" />
        <path d="M7.322 8.84c-.449-.625-.354-1.026-.164-1.827C7.685 4.79 9.62 3 12 3s4.315 1.79 4.842 4.013c.19.801.285 1.202-.164 1.827c-1.225 1.706-8.366 1.379-9.356 0M7 14l-2 7m12-7l2 7m-7-2h.009" />
      </g>
    </svg>
  );
}
