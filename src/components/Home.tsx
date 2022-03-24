import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <Flex flexDir='column' alignContent='center' textAlign='center'>
      <Heading mt='2rem' size='lg'>
        Home
      </Heading>
      <Text mt='1rem'>
        If you want to generate a signature, please click on the Generate
        button. If you already have a signature and want to claim, please click
        on the Claim button.
      </Text>
      <Flex
        flexDir='row'
        sx={{
          button: {
            margin: '1rem',
          },
        }}
        justifyContent='center'
      >
        <Button colorScheme='linkedin'>
          <Link to='/generate'>Generate</Link>
        </Button>

        <Button colorScheme='whatsapp'>
          <Link to='/claim'>Claim</Link>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Home;
