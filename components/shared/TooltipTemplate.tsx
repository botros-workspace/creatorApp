import { PlacementWithLogical, Tooltip } from '@chakra-ui/react'
import React, { FunctionComponent, ReactNode } from 'react'
import { useColor } from '../../shared/hooks/use-color.hook'

interface Props {
  children: ReactNode
  label: string
  hasArrow: boolean
  placement: PlacementWithLogical
  shouldWrapChildren: boolean
}

export const TooltipTemplate: FunctionComponent<Props> = ({
  children,
  label,
  hasArrow,
  placement,
  shouldWrapChildren,
}) => {
  const colors = useColor()

  return (
    <Tooltip
      borderRadius='xl'
      p={2}
      textColor={colors.textColor}
      bg={colors.menuBackgroundColor}
      label={label}
      hasArrow={hasArrow}
      placement={placement}
      shouldWrapChildren={shouldWrapChildren}
    >
      {children}
    </Tooltip>
  )
}

export default TooltipTemplate
