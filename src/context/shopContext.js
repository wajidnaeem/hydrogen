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
    collection: [],
    collectionProducts: [],
    productbyHnadle: {},
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    // if (localStorage["checkoutId"]) {

    // local stoarage use "setitem and getitem"

    if (localStorage.getItem("checkout_id")) {
      const fetchCheckout = this.fetchCheckout(
        localStorage.getItem("checkout_id")
      );
      console.log("fetchCheckout in if :: ", fetchCheckout);
    } else {
      console.log("createCheckout in else :: ");

      this.createCheckout();
    }
  }

  createCheckout = async () => {
    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      // console.log("createCheckout in createCheckout :: ", checkout);
      localStorage.setItem("checkout_id", checkout.id);
      this.setState({ checkout: checkout });
    });
  };

  // fetchCheckout = async (checkout_id) =>{} what is dfiffrence between this and i used
  // const checkout = await client.checkout.fetch(checkout_id); why its not support AWAIT

  fetchCheckout = async (checkoutId) => {
    const fetchCheckoutcontroll = await client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((error) => console.log(error));
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchAllCollections = async () => {
    client.collection.fetchAllWithProducts().then((collection) => {
      // Do something with the collections
      console.log("fetchAllCollections collection:: ", collection);
      // console.log(collection[0].products);

      this.setState({ collection: collection });
    });
  };

  fetchCollectionByHandle = async (collectionId) => {
    client.collection
      .fetchWithProducts(collectionId, { productsFirst: 100 })
      .then((collection) => {
        // Do something with the collection
        // console.log("collection:: ", collection);
        // console.log("collection.products:: ", collection.products);

        const collectionProducts = collection.products;
        console.log("collectionProducts:: ", collectionProducts);

        this.setState({ collectionProducts: collectionProducts });
      });
  };

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });

    return product;
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
          fetchCollectionByHandle: this.fetchCollectionByHandle,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
          addItemtoCheckout: this.addItemtoCheckout,
          removeLineItem: this.removeLineItem,
          fetchAllCollections: this.fetchAllCollections,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext, ShopProvider };
