'use client';

import React from "react";

export default function RadialProgress({ percentage }: { percentage: number }) {
  return (
    <div
      className="radial-progress transition ease-in-out delay-150 text-[#38bdf8] hover:scale-110 hover:text-[#2fa4d8] duration-250 "
      style={{ "--value": percentage, "--size": "10rem", "--thickness": "1rem"} as React.CSSProperties}
      role="progressbar"
    >
      {percentage}%
    </div>
  );
}
