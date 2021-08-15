import { css, Global } from "@emotion/react";
import React from "react";

const globalStyles = css`
  // No global styles
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
