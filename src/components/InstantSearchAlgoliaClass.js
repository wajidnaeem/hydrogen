import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { RichText } from "../components/RichText";
import { ImageWithText } from "../components/ImageWithText";
import ReactDOM from "react-dom";
// import algoliasearch from "algoliasearch/lite";
import algoliasearch from "algoliasearch";

import PropTypes from "prop-types";

import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "B1G2GM9NG0",
  "aadef574be1f9252bb48d4ea09b5cfe5"
);

const InstantSearchAlgoliaClass = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (!products) return <div>Loading....</div>;

  return (
    <div className="ais-InstantSearch">
      <h1>Algolia InstantSearch</h1>
      <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <h2>Brands</h2>
          <RefinementList
            attribute="brand"
            showMore={true}
            translations={{
              showMore: (isOpen) => {
                return isOpen ? "Show less" : "Show more";
              },
            }}
          />

          <RefinementList attribute="size" />

          <Configure hitsPerPage={3} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

function Hit(props) {
  return (
    <div>
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export { InstantSearchAlgoliaClass };
