import React, { useContext } from "react";
import { Box, Icon, Image, Text, Flex, Grid } from "@chakra-ui/react";
import { ShopContext } from "../context/shopContext";
import { useParams } from "react-router-dom";

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
  CloseIcon,
  Link,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

const Cart = () => {
  const { isCartOpen, closeCart, checkout, removeLineitem } =
    useContext(ShopContext);
  return (
    <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shoping Cart</DrawerHeader>

        <DrawerBody>
          {checkout.lineItems?.length ? (
            checkout.lineItems.map((item) => (
              <Grid templateColumns={"repeat(4, 1fr)"} gap={1} key={item.id}>
                <Flex alignItems="center" justifyContent="center">
                  <SmallCloseIcon
                    cursor="pointer"
                    onClick={() => removeLineitem(item.id)}
                  />
                </Flex>
                <Flex alignItems="center" justifyContent="center">
                  <Image src={item.variant.image.src} />
                </Flex>
                <Flex alignItems="center" justifyContent="center">
                  <Text>{item.variant.price} </Text>
                </Flex>
              </Grid>
            ))
          ) : (
            <Box h="100%" w="100%">
              <Text
                h="100%"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
              >
                Cart Is Empty
              </Text>
            </Box>
          )}
        </DrawerBody>

        {checkout.lineItems?.length ? (
          <DrawerFooter>
            <Button w="100%">
              <Link w="100%" href={checkout.webUrl}>
                Check Out
              </Link>
            </Button>
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};

export { Cart };
