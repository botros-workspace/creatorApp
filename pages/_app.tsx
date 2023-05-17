import React from 'react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Global, css } from '@emotion/react'
import 'focus-visible/dist/focus-visible'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '../components/Layout/Layout'
import { useColor } from '../shared/hooks/use-color.hook'
import { StepsTheme as Steps } from 'chakra-ui-steps'

function MyApp({ Component, pageProps }: AppProps) {
  const colors = useColor()
  const activeLabelStyles = {
    transform: 'scale(0.85) translateY(-24px)',
  }

  const theme = extendTheme({
    components: {
      Steps,
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles,
                },
              },
              // eslint-disable-next-line max-len
              'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
                {
                  ...activeLabelStyles,
                },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: 'absolute',
                backgroundColor: colors.mainBackground,
                pointerEvents: 'none',
                mx: 3,
                px: 2,
                my: 2,
                transformOrigin: 'left top',
              },
            },
          },
        },
      },
    },
  })
  const GlobalStyles = css`
    .js-focus-visible :focus:not([data-focus-visible-added]) {
      outline: none;
      box-shadow: none;
    }
  `
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
