import { Flex } from "@chakra-ui/react";
import {
  faGithub,
  faDiscord,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ComponentProps } from "react";

export const SocialIcons: React.FC<ComponentProps<typeof Flex>> = (props) => {
  return (
    <Flex
      direction="row"
      justifyContent={["left", "center"]}
      alignItems="center"
      gap="12px"
      {...props}
    >
      <a
        aria-label="GitHub Repository of Create Next Stack"
        href="https://github.com/akd-io/create-next-stack"
      >
        <FontAwesomeIcon width="24px" height="24px" icon={faGithub} />
      </a>
      <a aria-label="Community Discord" href="https://discord.gg/7Ns5WwGjjZ">
        <FontAwesomeIcon width="24px" height="24px" icon={faDiscord} />
      </a>
      <a
        aria-label="Twitter profile of the creator of Create Next Stack"
        href="https://twitter.com/akd_io"
      >
        <FontAwesomeIcon width="24px" height="24px" icon={faTwitter} />
      </a>
    </Flex>
  );
};
