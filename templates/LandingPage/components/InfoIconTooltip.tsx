import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip, Flex } from "@chakra-ui/react";
import { FC } from "react";

type WithInfoIconAndTooltipProps = {
  tooltip: string;
  children: React.ReactNode;
};
export const WithInfoIconAndTooltip: FC<WithInfoIconAndTooltipProps> = ({
  tooltip,
  children,
}) => {
  return (
    <Tooltip placement="top" label={tooltip} hasArrow shouldWrapChildren>
      <Flex direction="row">
        {children}
        <InfoOutlineIcon
          w={"16px"}
          h={"16px"}
          marginLeft="8px"
          alignSelf="center"
        />
      </Flex>
    </Tooltip>
  );
};
