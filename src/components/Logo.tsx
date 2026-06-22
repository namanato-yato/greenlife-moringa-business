import { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <defs>
        {/* Leaf gradient */}
        <linearGradient id="leafGrad" x1="0.1" y1="0.9" x2="0.9" y2="0.1">
          <stop offset="0%" stopColor="#2e7d32" />     {/* Deep Leaf Green */}
          <stop offset="40%" stopColor="#4caf50" />    {/* Midi Green */}
          <stop offset="100%" stopColor="#8bc34a" />   {/* Lime/Bright Yellow Green */}
        </linearGradient>
        
        {/* Leaf shadow */}
        <filter id="leafShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* -- GRAPHIC ELEMENTS (LEAF AND DOTS) -- */}
      <g transform="translate(45, -5)">
        {/* Two Floating Dots above the Leaf */}
        {/* Small Red Dot */}
        <circle cx="347" cy="85" r="5" fill="#ff0505" />
        {/* Slightly Larger Green Dot */}
        <circle cx="355" cy="74" r="7.5" fill="#2d8f16" />

        {/* The green leaf with white/light green veins */}
        <g filter="url(#leafShadow)">
          {/* Main Leaf Body */}
          <path
            d="M 283 175 C 265 130, 290 85, 348 78 C 354 105, 335 160, 283 175 Z"
            fill="url(#leafGrad)"
          />
          {/* Main central stem / vein */}
          <path
            d="M 283 175 C 310 148, 332 118, 348 78"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Sub-veins branching outwards (Left side pointing upwards) */}
          <path
            d="M 293 162 Q 285 145, 281 138"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 307 145 Q 296 128, 290 120"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 322 124 Q 311 110, 305 102"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          {/* Sub-veins branching outwards (Right side pointing downwards/outwards) */}
          <path
            d="M 299 152 Q 315 156, 323 160"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 314 135 Q 332 138, 339 141"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M 330 112 Q 344 114, 348 116"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </g>
      </g>

      {/* -- TYPOGRAPHY -- */}
      
      {/* "GREEN" in high-contrast organic green */}
      <text
        x="135"
        y="215"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="bold"
        fontSize="54"
        fill="#2e7d32"
        letterSpacing="0.5"
      >
        GREEN
      </text>

      {/* Heartbeat / ECG line */}
      {/* Connecting right after "GREEN" text finishes (around x=325) */}
      <path
        d="M 330 205 L 340 205 L 345 190 L 351 222 L 358 198 L 363 205 L 372 205 L 378 190 L 383 218 L 388 201 L 396 205 L 420 205"
        stroke="#2e7d32"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* "LIFE" in matching red above the pulse */}
      <text
        x="378"
        y="190"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="17"
        fill="#ff0505"
        letterSpacing="0.5"
      >
        LIFE
      </text>

      {/* "MORINGA" in extra bold red below, with green stalk/leaf-stem "I" */}
      <g>
        {/* Red letters M, O, R */}
        <text
          x="135"
          y="275"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="64"
          fill="#ff0505"
          letterSpacing="1"
        >
          MOR
        </text>

        {/* Custom Green "I" configured as active leaf stalk/vertical line */}
        {/* Positions perfectly between MOR (ends around x=298) and NGA (starts around x=334) */}
        <rect
          x="303"
          y="226"
          width="13"
          height="49"
          rx="6.5"
          fill="#2e7d32"
        />

        {/* Red letters N, G, A */}
        <text
          x="326"
          y="275"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="64"
          fill="#ff0505"
          letterSpacing="1"
        >
          NGA
        </text>
      </g>
    </svg>
  );
}
