import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { MdGraphicEq } from 'react-icons/md'
import { useColor } from '../../shared/hooks/use-color.hook'
import { Box } from '@chakra-ui/react'
type Props = {
  onChange: (value: number[]) => void
  values?: number[]
}
const SliderTemplate: FunctionComponent<Props> = ({ onChange, values }) => {
  const colors = useColor()

  return (
    <Box w={'100%'}>
      <RangeSlider
        defaultValue={values}
        onChange={(val) => onChange(val)}
        size={{ base: 'md', md: 'lg' }}
      >
        <RangeSliderTrack bg={colors.textOnHover}>
          <RangeSliderFilledTrack bg={colors.textColor} />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Box color={colors.textColor} as={MdGraphicEq} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={6} index={1}>
          <Box color={colors.textColor} as={MdGraphicEq} />
        </RangeSliderThumb>
      </RangeSlider>
    </Box>
  )
}

export default SliderTemplate
