import React from "react";
import { IconSvgProps } from "@/app/lib/definitions";

export const DeleteIcon = (props: IconSvgProps) => (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="2em"
    role="presentation"
    viewBox="0 0 24 24"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#E34234"
    strokeWidth="1.5"
    {...props}
    >
        <path d="M4 7H20" />
        <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"/>
        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"/>
    </svg>
);

