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
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useCart } from "react-use-cart";

export function Navbar() {
  const {items}=useCart();
  const userData = JSON.parse(localStorage.getItem("userDataLS")) || {};
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("blue.500", "gray.700");
  const color = useColorModeValue("white", "white");
  const { search, setSearch } = useContext(AuthContext);
  const toast = useToast();
  const handleAuth = () => {
    toast({
      title: "LogOut Successfull",
      position: "top",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    localStorage.setItem("isAuth", false);
  };
console.log(userData.firstName)
  return (
    <>
      <Box bg={bg} color={color} p={4}>
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
            <Link to={`/search/${search}`}>
              {" "}
              <InputRightAddon
                children={<SearchIcon />}
                bg={color}
                color={bg}
              />
            </Link>
          </InputGroup>
          <Box>
            {isAuth ? (
              <Menu isLazy>
                <MenuButton>{userData.firstName}</MenuButton>
                <MenuList bg={color} color={bg}>
                  <Center>
                    <Button onClick={handleAuth}>Logout</Button>
                  </Center>
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
          <Link to={"/cart"}>
            <Flex>
              <AiOutlineShoppingCart size={30} />
              <Box className="cartLength">{items.length}</Box>
            </Flex>
          </Link>
          <Button onClick={toggleColorMode} bg={bg}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </>
  );
}
