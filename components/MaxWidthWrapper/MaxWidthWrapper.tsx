import {FC, ReactNode} from "react";

interface Props{
    children:ReactNode
}

export const MaxWidthWrapper:FC<Props> = ({children}) => {
  return (
    <section className="max_width_wrapper">
    {children}
    </section>
  )
}
