import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Box,
} from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitter } from 'react-icons/fa'
import { SiGooglemaps, SiWebstorm } from 'react-icons/si'
import { MdAlternateEmail } from 'react-icons/md'
import { useColor } from '../../shared/hooks/use-color.hook'
import { LinksInputAttributes } from '../../shared/interfaces/LinksInputAttributes'
import LinkInputTemplate from './LinkInputTemplate'
import { HiOutlineTicket } from 'react-icons/hi'
import { CgPhone } from 'react-icons/cg'

const LinksContainer: FunctionComponent = () => {
  const colors = useColor()
  const leftArray: LinksInputAttributes[] = [
    {
      label: 'Ticket website',
      icon: HiOutlineTicket,
    },
    {
      label: 'Own website link',
      icon: SiWebstorm,
    },
    {
      label: 'Email',
      icon: MdAlternateEmail,
    },
    {
      label: 'Phone',
      icon: CgPhone,
    },
  ]
  const rightArray: LinksInputAttributes[] = [
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
  ]
  return (
    <Box w={'100%'} h={'100%'}>
      <Flex
        w={'100%'}
        h={'100%'}
        flexDir={{ base: 'column', lg: 'row' }}
        gap={{ base: 6, lg: 0 }}
        mt={{ base: 6, lg: 0 }}
      >
        <Flex
          w={{ base: '95%', lg: '50%' }}
          h={'100%'}
          flexDir={'column'}
          justifyContent={'center'}
          gap={4}
        >
          {leftArray.map((link: LinksInputAttributes, index: number) => {
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
        <Flex
          w={{ base: '95%', lg: '50%' }}
          h={'100%'}
          flexDir={'column'}
          justifyContent={'center'}
          gap={4}
        >
          {rightArray.map((link: LinksInputAttributes, index: number) => {
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
      </Flex>
    </Box>
  )
}

export default LinksContainer
