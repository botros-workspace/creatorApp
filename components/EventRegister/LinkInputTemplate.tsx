import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitter } from 'react-icons/fa'
import { SiGooglemaps } from 'react-icons/si'
import { MdAlternateEmail } from 'react-icons/md'
import { useColor } from '../../shared/hooks/use-color.hook'
import { LinksInputAttributes } from '../../shared/interfaces/LinksInputAttributes'
const LinkInputTemplate: FunctionComponent<LinksInputAttributes> = ({
  icon,
  label,
  yupRegisteration,
  errorMessage,
}) => {
  const colors = useColor()

  return (
    <Flex mx='auto' gap={{ base: 2, md: 6 }} h={{ base: 14, md: 16 }}>
      <Icon
        as={icon}
        fontSize={{ base: 'xl', md: '3xl' }}
        mt={{ base: 2, md: 1 }}
        color={colors.primaryColor}
      />
      <FormControl variant='floating' borderColor={colors.primaryColor}>
        <Input
          w={{ base: '100%', sm: 72, md: 96 }}
          type='text'
          textColor={colors.textOnHover}
          fontWeight={'semibold'}
          p={4}
          //   {...register('twitter')}
        />
        <FormLabel
          rounded='full'
          fontSize={{ base: 'sm', xl: 'lg' }}
          textColor={colors.primaryColor}
        >
          {label}
        </FormLabel>
        {/* {errors.twitter?.message && (
          <Text color='red' fontSize={{ base: 'xs', md: 'md' }} ml={2}>
            {errors.twitter?.message}
          </Text>
        )} */}
      </FormControl>
    </Flex>
  )
}

export default LinkInputTemplate
