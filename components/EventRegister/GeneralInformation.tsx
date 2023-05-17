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
import LinkInputTemplate from './LinkInputTemplate'

const GeneralInformation: FunctionComponent = () => {
  const colors = useColor()
  const linksArray: LinksInputAttributes[] = [
    {
      label: 'Facebook link',
      icon: FaFacebookSquare,
    },
    {
      label: 'Instagram link',
      icon: BsInstagram,
    },
    {
      label: 'Google maps link',
      icon: SiGooglemaps,
    },
    {
      label: 'Twitter link',
      icon: FaTwitter,
    },
    {
      label: 'Own website link',
      icon: MdAlternateEmail,
    },
  ]
  return (
    <Flex
      w='100%'
      h='100%'
      flexDir='column'
      justifyContent='center'
      gap={6}
      my={6}
    >
      {linksArray.map((link: LinksInputAttributes, index: number) => {
        return (
          <LinkInputTemplate
            key={index}
            icon={link.icon}
            label={link.label}
            yupRegisteration={link?.yupRegisteration}
            errorMessage={link.errorMessage}
          />
        )
      })}
    </Flex>
  )
}

export default GeneralInformation
