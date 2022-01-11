import React, { Component } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    productbyHnadle: {},
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    // console.log("localStorage near if :: ", localStorage["checkoutId"]);
    if (localStorage["checkoutId"]) {
      const fetchCheckout = this.fetchCheckout(localStorage["checkoutId"]);
      console.log("fetchCheckout in if :: ", fetchCheckout);
    } else {
      console.log("createCheckout in if :: ");

      this.createCheckout();
    }
  }

  createCheckout = async () => {
    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      console.log("createCheckout in createCheckout :: ", checkout);
      localStorage.setItem("checkout_id", checkout.id);
      this.setState({ checkout: checkout });
    });

    // const checkout = client.checkout.create();
    // console.log("createCheckout in createCheckout :: ", checkout);

    // localStorage.setItem("checkout_id", checkout.id);
    // this.setState({ checkout: checkout });
  };

  // fetchCheckout = async (checkout_id) =>{} what is dfiffrence between this and i used
  // const checkout = await client.checkout.fetch(checkout_id); why its not support AWAIT

  fetchCheckout = async (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((error) => console.log(error));
  };

  addItemtoCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    console.log("addItemtoCheckout ::>", this.state.checkout.id);

    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    console.log("addItemtoCheckout ::>", checkout);

    this.setState({ checkout: checkout });
    this.openCart();
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });

    return product;
  };

  removeLineItem = async (lineItemIdsToRemove) => {
    const checkoutId = this.state.checkout.id;

    client.checkout
      .removeLineItems(checkoutId, lineItemIdsToRemove)
      .then((checkout) => this.setState({ checkout }));
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
          addItemtoCheckout: this.addItemtoCheckout,
          removeLineItem: this.removeLineItem,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext, ShopProvider };
