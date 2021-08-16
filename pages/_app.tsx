import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../theme";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={theme.config}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default CustomApp;
