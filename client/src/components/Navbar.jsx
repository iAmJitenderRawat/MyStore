import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightAddon,
  useColorMode,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function Navbar() {
  const userData = JSON.parse(localStorage.getItem("userDataLS")) || {};
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("blue.500", "gray.700");
  const color = useColorModeValue("white", "white");
  const { auth, setAuth } = useContext(AuthContext);
  const { search, setSearch } = useContext(AuthContext);
  const toast = useToast();
  const handleAuth = () => {
    setAuth(false);
    toast({
      title: "LogOut Successfull",
      position: "top",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box bg={bg} color={color} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-around"}
          gap={5}
        >
          <Heading as="b">
            <Link to={"/"}>MyStore</Link>
          </Heading>
          <InputGroup
            size="md"
            w={{ xl: "100%", lg: "80%", md: "60%", sm: "40%", base: "0" }}
            display={{
              xl: "inline-flex",
              lg: "inline-flex",
              md: "inline-flex",
              sm: "inline-flex",
              base: "none",
            }}
          >
            <Input
              placeholder="Search"
              _placeholder={{ color: "gray" }}
              name={"search"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg={color}
              color={bg}
            />
            <Link to={""}>
              {" "}
              <InputRightAddon
                children={<SearchIcon />}
                bg={color}
                color={bg}
              />
            </Link>
          </InputGroup>
          <Box>
            {auth ? (
              <Menu isLazy>
                <MenuButton>{userData.firstName}</MenuButton>
                <MenuList bg={color} color={bg}>
                  <Button onClick={handleAuth}>Logout</Button>
                </MenuList>
              </Menu>
            ) : (
              <Menu isLazy>
                <MenuButton>
                  {/* <Button bg={color} color={bg}>Sign Up / Sign In</Button> */}
                  <AiOutlineUser size={30} />
                </MenuButton>
                <MenuList bg={color} color={bg}>
                  <MenuItem
                    bg={color}
                    color={bg}
                    _hover={{ background: "gray.200" }}
                  >
                    <Link to={"/signUp"}>Sign Up</Link>
                  </MenuItem>
                  <MenuItem
                    bg={color}
                    color={bg}
                    _hover={{ background: "gray.200" }}
                  >
                    <Link to={"/signIn"}>Sign In</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Box>
          <Box>
            <AiOutlineShoppingCart size={30} />
          </Box>
          <Button onClick={toggleColorMode} bg={bg}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
