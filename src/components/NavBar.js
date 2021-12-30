import React, { useContext } from "react";
import { Box, Icon, Image, Text, Flex, Link } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { MdMenu, MdShoppingBasket } from "react-icons/md";

const NavBar = () => {
  const { openCart, openMenu, checkOut } = useContext(ShopContext);

  return (
    <Flex
      backgroundColor="#FFA8E2"
      flexDir="row"
      justifyContent="space-between"
      p="2rem"
    >
      <Icon fill="white" cursor="pointer" as={MdMenu} w={30} h={30}></Icon>
      <Link to="/">
        <Text>
          <Icon fill="white" cursor="pointer" as={MdMenu} w={30} h={30}></Icon>
        </Text>
      </Link>
      <Icon
        fill="red"
        as={MdShoppingBasket}
        w={30}
        h={30}
        onClick={() => openCart()}
      ></Icon>
    </Flex>
  );
};

export { NavBar };
