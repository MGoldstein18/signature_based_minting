// Import the required libraries
import { useState } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useNFTCollection, useAddress, useMetamask } from '@thirdweb-dev/react';
import { Link } from 'react-router-dom';

function Generate() {
  // State to hold the payload and signature from the generateSignatures function
  const [payload, setPayload] = useState<any>();
  const [signature, setSignature] = useState<any>();

  // State to control when to display the "Loading..."
  const [loading, setLoading] = useState(false);

  // get the user's address
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // You can find your contract address in your dashboard after you have created an NFT Collection contract
  const nftCollectionContractAddress =
    '0xC491562C77bB9B85553f34422c919d137A635724';

  // Connect to contract using the address
  const nftCollection = useNFTCollection(nftCollectionContractAddress);

  // Function to generate the signature
  async function generateSignature() {
    // Once the function is called, we are now loading
    setLoading(true);

    // Give the user 24 hours to mint the NFT
    const startTime = new Date();
    const endTime = new Date(Date.now() + 60 * 1000);

    // Set up the NFT metadata
    const nftMetadata = {
      metadata: {
        name: 'Some Awesome NFT',
        description: 'This is a description of the NFT',
        image:
          'ipfs://bafybeihgfxd5f5sqili34vyjyfai6kezlagrya43e6bkgw6hnxucxug5ya',
      },
      mintStartTime: startTime,
      mintEndTime: endTime,
    };

    // Call the generate method and set loading to false once the call is complete
    const response = await nftCollection?.signature
      .generate(nftMetadata)
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch((error) => console.error(error));

    // Set state to the relevant parts of the response
    setPayload(response?.payload);
    setSignature(response?.signature);
    
  }

  // check for address and display connect button if no address is found
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

  // Display generate button or "Loading..."
  // If there is a payload, display it with the signature and button to take the user to the claim page
  return (
    <Flex flexDir='column' alignContent='center' textAlign='center' mt='2rem'>
      <Heading>Generate a Signature</Heading>
      <Flex justifyContent='center' flexDir='row' mt='2rem'>
        {loading ? (
          <Text fontWeight='bold'>Loading...</Text>
        ) : (
          <Button size='lg' colorScheme='cyan' onClick={generateSignature}>
            Generate
          </Button>
        )}
      </Flex>
      {payload && (
        <Flex
          flexDir='column'
          alignContent='center'
          textAlign='center'
          mt='2rem'
        >
          <Heading mt='3rem'>Payload and Signature</Heading>
          <Text>
            Please copy your payload and signature, click on claim and go mint
            your NFT!
          </Text>
          <Text mt='2rem' fontWeight='bold'>
            Payload:
          </Text>
          <Text mt='1rem' ml='2rem' mr='2rem'>
            {JSON.stringify(payload)}
          </Text>
          <Text mt='2rem' fontWeight='bold'>
            Signature:
          </Text>
          <Text mt='1em'>{signature}</Text>
          <Flex justifyContent='center' flexDir='row' mt='2rem'>
            <Button colorScheme='whatsapp'>
              <Link to='/claim'>Claim</Link>
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Generate;
