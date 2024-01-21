import { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  Hide,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { handleFetchRandomImage } from '../handles/unsplashHandler';
import {
  handleLoginUser,
  handleGoogleLogin,
  handleCreateUser,
} from '../handles/firebaseHandler';
import '../style/Login.scss';
import diaryImg from '/dear-diary.png';

function Login({ logInSuccessful, ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    handleFetchRandomImage().then((res) => {
      setBackgroundImage(res);
    });
  }, []);

  const logInWithGoogle = () => {
    handleGoogleLogin(logInSuccessful);
  };

  const logInWithEmail = () => {
    handleLoginUser(email, password, logInSuccessful);
  };

  return (
    <Grid
      h='100vh'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(12, 1fr)'
    >
      <Hide below='lg'>
        <GridItem
          rowSpan={2}
          colSpan={8}
          bgImage={backgroundImage}
          bgSize={'cover'}
        >
          <Flex
            alignItems='center'
            justifyContent='center'
            h='100%'
            bg={'rgba(0,0,0,0.3)'}
          ></Flex>
        </GridItem>
      </Hide>
      <GridItem rowSpan={2} colSpan={{ base: 12, lg: 4 }} bg='cream'>
        <Grid h='100%' templateRows='repeat(3, 1fr)' mx={{ base: 4, lg: 10 }}>
          <GridItem pt={10}>
            <img src={diaryImg} alt='dear diary' />
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              {/* Google Login */}
              <Button
                my={4}
                py={6}
                w={'100%'}
                type='submit'
                colorScheme='gray'
                onClick={logInWithGoogle}
                leftIcon={<FcGoogle size={'35px'} />}
              >
                Log In with Google
              </Button>
              <hr />
              {/* Email Login */}
              <FormLabel mt={6}>E-mail</FormLabel>
              <Input
                placeholder='example@gmail.com'
                type='email'
                onChange={handleEmailChange}
                id='email'
              />
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                onChange={handlePasswordChange}
                id='password'
              />
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
                w={'100%'}
                onClick={logInWithEmail}
              >
                {' '}
                Log In{' '}
              </Button>
              {/* Sign Up */}
              <Button mt={4} colorScheme='orange' type='submit' w={'100%'}>
                {' '}
                Sign Up{' '}
              </Button>
            </FormControl>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default Login;
