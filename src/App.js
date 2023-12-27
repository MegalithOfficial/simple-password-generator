import { Button, Box, Checkbox, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex, Textarea, useClipboard, Heading, Link, Icon } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';

const PasswordGenerator = () => {
  const [passwords, setPasswords] = useState([]);
  const [length, setLength] = useState(16);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [numPasswords, setNumPasswords] = useState(5);
  const { hasCopied: allCopied, onCopy: copyAll } = useClipboard(passwords.join('\n'));
  const { hasCopied: firstCopied, onCopy: copyFirst } = useClipboard(passwords[0] || '');

  const generatePasswords = () => {
    const charset = [
      includeUpperCase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      includeLowerCase ? 'abcdefghijklmnopqrstuvwxyz' : '',
      includeSymbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?/~' : '',
      includeNumbers ? '0123456789' : '',
    ].join('');

    const getPassword = () => {
      const password = [];
      const characters = new Uint32Array(length);
      window.crypto.getRandomValues(characters);

      for (let i = 0; i < length; i++) {
        const charIndex = characters[i] % charset.length;
        password.push(charset.charAt(charIndex));
      }

      return password.join('');
    };

    let newPasswords = [];
    for (let i = 0; i < numPasswords; i++) {
      newPasswords.push(getPassword());
    }

    setPasswords(newPasswords);
  };

  return (
    <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.500">
      <Box p={6} bg="gray.800" borderRadius="xl" boxShadow="lg" color="white">
        <Box maxW="400px" mx="auto">

          <Heading as="h1" mb={4} textAlign="center">
            Password Generator
          </Heading>

          <FormControl mb={4}>
            <FormLabel>Select Password Length: {length}</FormLabel>
            <Slider aria-label="password-length-slider" min={4} max={128} value={length} onChange={(value) => setLength(value)} step={1}>
              <SliderTrack bg="teal.400">
                <SliderFilledTrack bg="teal.500" />
              </SliderTrack>
              <SliderThumb boxSize={6} bg="teal.500" />
            </Slider>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Select Number of Passwords: {numPasswords}</FormLabel>
            <Slider aria-label="number-of-passwords-slider" min={1} max={100} value={numPasswords} onChange={(value) => setNumPasswords(value)} step={1}>
              <SliderTrack bg="teal.400">
                <SliderFilledTrack bg="teal.500" />
              </SliderTrack>
              <SliderThumb boxSize={6} bg="teal.500" />
            </Slider>
          </FormControl>

          <FormControl mb={4}>
            <Flex justifyContent="center" mb={4}>
              <Box mb={2}>
                <FormLabel fontSize="x-large">Options</FormLabel>
              </Box>
            </Flex>
            <Flex flexWrap="wrap" justifyContent="center">
              <Checkbox isChecked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} colorScheme="teal" mb={2} mr={4}>
                Include Uppercase
              </Checkbox>
              <Checkbox isChecked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} colorScheme="teal" mb={2} mr={4}>
                Include Lowercase
              </Checkbox>
              <Checkbox isChecked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} colorScheme="teal" mb={2} mr={4}>
                Include Symbols
              </Checkbox>
              <Checkbox isChecked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} colorScheme="teal" mb={2}>
                Include Numbers
              </Checkbox>
            </Flex>
          </FormControl>

          <Flex justifyContent="center">
            <Button colorScheme="teal" onClick={generatePasswords} mb={4} mr={2} w="100%">
              Generate Passwords
            </Button>
            <Flex justifyContent="center">
              <Button colorScheme="teal" onClick={copyAll} mr={2} mb={4}>
                Copy All
              </Button>
              <Button colorScheme="teal" onClick={copyFirst} mb={4}>
                Copy First
              </Button>
            </Flex>
          </Flex>

          <Textarea value={passwords.join('\n\n')} isReadOnly rows={5} bg="gray.700" color="teal.200" w="100%" />
          {allCopied && <p style={{ textAlign: 'center' }}>All passwords copied!</p>}
          {firstCopied && <p style={{ textAlign: 'center' }}>First password copied!</p>}
        </Box>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          textAlign="center"
          py={4}
          color="gray.300"
          fontSize="sm"
        >
          <p>Made by MegalithOfficial</p>
          <Link href="https://github.com/MegalithOfficial/simple-password-generator" isExternal display="inline-block" color="white">
            <Flex alignItems="center" justifyContent="center">
              <Icon as={FaGithub} mr={1} />
              Github
            </Flex>
          </Link>
          <p textAlign="center">Your generated passwords are not saved or sent over the internet.</p>
        </Box>
      </Box>
    </Flex>
  );
};

export default PasswordGenerator;
