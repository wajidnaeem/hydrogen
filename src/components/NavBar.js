import React, { useContext } from "react";
import { Box, Icon, Image, Text, Flex } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { MdMenu, MdShoppingBasket } from "react-icons/md";

const NavBar = () => {
  const { openCart, openMenu, checkOut } = useContext(ShopContext);

  return (
    <Flex flexDir="row" justifyContent="space-between" p="2rem">
      <Text>Menu</Text>
      <Text>Logo</Text>
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
