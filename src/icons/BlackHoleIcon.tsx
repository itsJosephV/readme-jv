import {SVGProps} from "react";

export function BlackHoleIcon(props: SVGProps<SVGSVGElement>) {
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
        <path d="M12 3a6.02 6.02 0 0 0-5.923 4.9c-.086.466-.13.699.032 1.005c.161.307.39.409.847.613c1.38.614 3.134.982 5.044.982s3.665-.368 5.044-.982c.457-.204.686-.306.847-.613c.162-.306.118-.54.032-1.005A6.02 6.02 0 0 0 12 3" />
        <path d="M17 5.5c2.989.788 5 2.26 5 3.945C22 11.961 17.523 14 12 14S2 11.96 2 9.445C2 7.76 4.011 6.288 7 5.5M12 18v3m5-4l1 4M7 17l-1 4" />
      </g>
    </svg>
  );
}
