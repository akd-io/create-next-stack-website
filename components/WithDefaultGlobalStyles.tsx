import { css, Global } from "@emotion/react";
import React from "react";

const globalStyles = css`
  code {
    font-family: "Roboto Mono", monospace;
  }
`;

const WithDefaultGlobalStyles: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  );
};

export default WithDefaultGlobalStyles;
