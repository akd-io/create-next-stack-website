import { NextPage } from "next";
import Page from "../components/Page";
import LandingPageTemplate from "../templates/LandingPage/LandingPageTemplate";

const Index: NextPage = () => {
  return (
    <Page
      title="Create Next Stack"
      description="Create your Next.js project today! Create Next Stack is a website and CLI tool used to easily set up the boilerplate of new Next.js apps."
    >
      <LandingPageTemplate />
    </Page>
  );
};

export default Index;
