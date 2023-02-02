import {FC, ReactNode} from "react";

interface Props{
    children:ReactNode
}

export const MaxWidthWrapper:FC<Props> = ({children}) => {
  return (
    <div className="max_width_wrapper">
    {children}
    </div>
  )
}
