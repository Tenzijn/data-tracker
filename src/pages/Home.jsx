import {
  Grid,
  GridItem,
  Button,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Spacer,
  Avatar,
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';
import { handleLogoutUser, handleSubmit } from '../handles/firebaseHandler';
import { useEffect, useState } from 'react';
import { fireStore } from '../firebase/firebaseConfig';
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import EditorComponent from '../components/EditorComponent';

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userContent, setUserContent] = useState([]);
  const [editData, setEditData] = useState(null);
  const userData = JSON.parse(localStorage.getItem('user'));
  const logOut = () => {
    localStorage.removeItem('user');
    handleLogoutUser();
  };

  const submitData = (data) => {
    handleSubmit({ uid: userData.uid, content: data });
    fetchData();
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(fireStore, userData.uid, id));
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    const data = await getDocs(collection(fireStore, userData.uid));
    setUserContent(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async (id, data) => {
    try {
      await updateDoc(doc(fireStore, userData.uid, id), {
        content: data,
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const setEdit = (data) => {
    setEditData(data);
  };

  return (
    <>
      <Grid templateColumns='repeat(12, 1fr)' gap={4}>
        <GridItem
          colSpan={12}
          bg={'blue.900'}
          p='10px'
          fontWeight={'600'}
          textColor={'white'}
        >
          <Flex alignItems='center' gap={4} w='100%' position='sticky' px={9}>
            <Text fontSize='xl'> Dear Diary </Text>
            <Spacer />
            <Text fontSize='xl'>Welcome back </Text>
            <Avatar
              name={userData.displayName}
              src={userData.photoURL}
              size={'md'}
            />
            <Button onClick={logOut} type='submit' colorScheme='red'>
              Log Out
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      <Container maxW={'container.xl'}>
        <SimpleGrid
          spacing={4}
          templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
          mt={10}
        >
          {userContent.map((content) => {
            const header = content.content.blocks[0].data.text;
            const date = new Date(Number(content.content.time)).toDateString();
            const id = content.id;
            return (
              <Card bg={'gray.100'} shadow={'md'} key={content.id}>
                <CardHeader>
                  <Heading size='md'>{date}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{header}</Text>
                </CardBody>
                <CardFooter>
                  <Stack direction='row' width={'100%'}>
                    <Button
                      colorScheme='pink'
                      variant='solid'
                      onClick={(e) => {
                        setEdit(null);
                        e.preventDefault();
                        deleteData(id);
                      }}
                    >
                      <RiDeleteBin5Line />
                    </Button>
                    <Spacer />
                    <Button
                      colorScheme='blue'
                      variant='outline'
                      onClick={(e) => {
                        e.preventDefault();
                        setEditData(content.content);
                        onOpen();
                      }}
                    >
                      <FaEye />
                    </Button>
                  </Stack>
                </CardFooter>
              </Card>
            );
          })}

          <Card
            bg={'gray.100'}
            _hover={{ bg: 'gray.200', cursor: 'pointer' }}
            shadow={'md'}
            onClick={(e) => {
              setEdit(null);
              e.preventDefault();
              onOpen();
            }}
          >
            <CardBody>
              <Flex alignItems='center' justifyContent='center' h='100%'>
                <IoMdAdd size='60px' _hover={{ color: 'red' }} />
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>

      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditorComponent
              submitData={submitData}
              closeModel={onClose}
              data={editData}
              setEdit={setEdit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;
