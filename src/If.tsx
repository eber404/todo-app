import { ReactElement } from "react"

interface Props {
  children: ReactElement
  condition: boolean
  elseComponent?: ReactElement
}

export function If({ children, condition, elseComponent = <></> }: Props) {
  return condition ? children : elseComponent
}
