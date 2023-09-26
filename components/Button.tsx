import React from 'react'


interface Props{
    text: string;
    type?: "primary" | "secondary";
    className?: string;
    onClick? : () => void;
    isLoading?: boolean;
}

export default function Button(props:Props) {
  return (
    <button 
    disabled={props.isLoading}
      onClick={props.onClick} 
      className={`bg-black px-3 py-2  hover:bg-zinc-800 
      ${props.type === "secondary" && "bg-white text-black border-black border-2 hover:bg-black hover:text-white"}
      ${props.type !== "secondary" && "text-white"}
      ${props.className}
    `}
    >
      {props.isLoading ? "Loading..." : props.text}
    </button>
  )
}
