import { ChakraProvider, ColorModeProvider, LightMode } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../theme";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={theme.config}>
        {/* TODO: Remove <LightMode> wrapper when theme.config.useSystemColorMode is correctly interpreted as false by Chakra UI. */}
        <LightMode>
          <Component {...pageProps} />
        </LightMode>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default CustomApp;
