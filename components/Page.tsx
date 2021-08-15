import Head from "next/head";
import React from "react";
import WithDefaultGlobalStyles from "./WithDefaultGlobalStyles";

type PageProps = {
  title: string;
  description: string;
};
const Page: React.FC<PageProps> = ({ title, description, children }) => {
  return (
    <WithDefaultGlobalStyles>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </WithDefaultGlobalStyles>
  );
};

export default Page;
