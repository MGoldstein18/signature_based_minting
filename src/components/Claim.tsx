import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import {} from '@thirdweb-dev/react';

function Generate() {
  return (
    <Flex flexDir='column' alignContent='center' textAlign='center'>
      <Heading mt="2rem" size='lg'>Claim</Heading>
      <Text mt="1rem">
        If you want to generate a signature, please click on the Generate
        button. If you already have a signature and want to claim, please click
        on the Claim button.
      </Text>
      <Flex
        flexDir="row"
        sx={{
          button: {
            margin: "1rem",
          },
        }}
        justifyContent="center"
      >
        <Button colorScheme="linkedin" >
          Generate
        </Button>

        <Button colorScheme="whatsapp" >
          Claim
        </Button>
      </Flex>
    </Flex>
  );
}

export default Generate;
