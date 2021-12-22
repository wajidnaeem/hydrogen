import React, { Component } from "react";
import PropTypes from "prop-types";
import Client from "shopify-buy";

const ShopContext = React.createContext();
let client;
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
    // console.log("ENV DOMAIN:: ", process.env.REACT_APP_SHOPIFY_DOMAIN);
    // console.log("ENV API KEY :: ", process.env.REACT_APP_SHOPIFY_API);

    client = Client.buildClient({
      domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
      storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
    });
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id);
    } else {
      this.createCheckout();
    }
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithHandle = async (handle) => {
    const productbyHnadle = await client.product.fetchByHandle(handle);
    this.setState({ productbyHnadle: productbyHnadle });
  };

  addItemtoCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });
    this.openCart();
  };

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout-id", checkout.id);
    this.setState({ checkout: checkout });
  };

  fetchCheckout = (checkoutId) => {
    client.checkout.fetch(checkoutId).then((checkout) => {
      this.setState({ checkout: checkout });
    });
  };

  removeLineitem = async (LineItemIdstoRemaove) => {};

  closeCart = async () => {
    this.setState({ isCartOpen: false });
  };

  openCart = async () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = async () => {};
  openMenu = async () => {};

  static propTypes = {};

  render() {
    console.log(this.state.checkout);
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          closeCart: this.closeCart,
          openMenu: this.openMenu,
          closeMenu: this.closeMenu,
          addItemtoCheckout: this.addItemtoCheckout,
          removeLineitem: this.removeLineitem,
          openCart: this.openCart,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext, ShopProvider };
