import React, { useContext } from "react";
import { Box, Icon, Image, Text, Flex, Grid } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { MdMenu, MdShoppingBasket } from "react-icons/md";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const Cart = () => {
  const { isCartOpen, closeCart, checkout, removeLineItem } =
    useContext(ShopContext);
  return (
    <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shoping Cart</DrawerHeader>

        <DrawerBody>
          {checkout.lineItems &&
            checkout.lineItems.map((item) => (
              <Grid templateColumns={"repeat(4, 1fr)"} gap={1} key={item.id}>
                <Text>{item.title}</Text>
              </Grid>
            ))}
        </DrawerBody>

        <DrawerFooter>
          <Button>Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { Cart };
