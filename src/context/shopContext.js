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
    client = Client.buildClient({
      domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
      storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
    });

    // console.log("localStorage :: ", localStorage["checkout-id"]);

    if (localStorage["checkout-id"]) {
      this.fetchCheckout(localStorage["checkout-id"]);
    } else {
      this.createCheckout();
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    this.setState({ checkout: checkout });
  };

  fetchCheckout = (checkout_id) => {
    const checkout = client.checkout.fetch(checkout_id);
    this.setState({ checkout: checkout });
  };

  addItemtoCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId: variantId,
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

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductWithHandle = async (handle) => {
    const productbyHnadle = await client.product.fetchByHandle(handle);
    this.setState({ productbyHnadle: productbyHnadle });
  };

  removeLineitem = async (LineItemIdstoRemaove) => {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      LineItemIdstoRemaove
    );
    this.setState({ checkout: checkout });
  };

  closeCart = async () => {
    this.setState({ isCartOpen: false });
  };

  openCart = async () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = async () => {
    this.setState({ isCartOpen: false });
  };

  openMenu = async () => {
    this.setState({ isCartMenu: true });
  };

  static propTypes = {};

  render() {
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
