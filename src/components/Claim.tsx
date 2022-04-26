// Import the required libraries
import { useState } from 'react';
import {
  Flex,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useNFTCollection, useAddress, useMetamask } from '@thirdweb-dev/react';

function Claim() {
  // State to keep take the form input
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');

  // State to control when to display "Loading..."
  const [loading, setLoading] = useState(false);

  // Get the user's address
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // You can find your contract address in your dashboard after you have created an NFT Collection contract
  const nftCollectionContractAddress =
    '0xC491562C77bB9B85553f34422c919d137A635724';

  // Connect to contract using the address
  const nftCollection = useNFTCollection(nftCollectionContractAddress);

  // Functions to handle changes in form inputs
  function payloadChange(e: any) {
    setPayload(e.target.value.trim());
  }

  function signatureChange(e: any) {
    setSignature(e.target.value.trim());
  }

  // Function to claim NFT
  async function claim() {
    setLoading(true);

    const mintInput = {
      payload: JSON.parse(payload),
      signature,
    };

    await nftCollection?.signature
      .mint(mintInput)
      .then((data) => {
        alert('NFT successfully minted!');
        setLoading(false);
        setPayload('');
        setSignature('');
      })
      .catch((error) => {
        setLoading(false);
        alert('Error! Failed to mint NFT');
        console.error(error);
      });
  }

  // Check for address and display connect button if no address is found
  if (!address) {
    return (
      <Flex flexDir='column' alignContent='center' textAlign='center' mt='2rem'>
        <Heading>Connect your wallet</Heading>
        <Flex flexDir='row' justifyContent='center' mt='2rem'>
          <Button size={'lg'} colorScheme='blue' onClick={connectWithMetamask}>
            Connect with Metamask
          </Button>
        </Flex>
      </Flex>
    );
  }
  return (
    <Flex flexDir='column' alignContent='center' textAlign='center'>
      <Heading mt='2rem' size='lg'>
        Claim
      </Heading>
      <Text mt='1rem'>
        To claim an NFT please paste in your payload and signature.
      </Text>
      <Flex
        m='3rem'
        flexDir='column'
        sx={{
          button: {
            margin: '1rem',
          },
        }}
        justifyContent='center'
      >
        <FormControl>
          <FormLabel>Payload</FormLabel>
          <Textarea value={payload} onChange={payloadChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Signature</FormLabel>
          <Input value={signature} onChange={signatureChange} />
        </FormControl>

        {loading ? (
          <Text fontWeight='bold'>Loading...</Text>
        ) : (
          <Button colorScheme='whatsapp' onClick={claim}>
            Claim
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Claim;
