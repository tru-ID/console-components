import { Box, Flex, Heading, Icon, Tooltip } from "@chakra-ui/react";
import * as React from "react";
import { AiFillInfoCircle } from "react-icons/ai";

export interface BalanceProps {
  // TODO use correct type
  workspace: any;
}

function Balance({ workspace }: BalanceProps) {
  return (
    <>
      <Heading
        as="h2"
        fontSize="md"
        fontWeight="700"
        mb={2}
        mt={{ sm: 10, md: 0 }}
      >
        Balance
      </Heading>
      <Flex alignItems="baseline">
        <Box as="span" mr={2} data-testid="balance">
          {workspace!._embedded!.balance.amount_available}
        </Box>
        <Box as="span" fontSize="lg">
          {workspace!._embedded!.balance.currency}
          {workspace!._embedded!.balance.currency === "API" && " calls"}
        </Box>
        {workspace!._embedded!.balance.currency === "API" && (
          <Tooltip
            fontSize="sm"
            placement="right"
            hasArrow
            label='The "API" currency is used for free API calls. Each accepted Verification request deducts your API balance by 1.'
            aria-label="Info tooltip"
            closeDelay={200}
          >
            <span>
              <Icon as={AiFillInfoCircle} color="blue.400" width={4} ml={2} />
            </span>
          </Tooltip>
        )}
      </Flex>
    </>
  );
}

export default Balance;
