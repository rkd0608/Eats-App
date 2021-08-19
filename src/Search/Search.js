import React from "react";
import { NavBar } from "../NavBar/NavBar";
//import styles from "./Search.module.css";
import { SearchResultsSummary } from "./SearchResultsSummary/SearchResultsSummary";
import { SearchResults } from "./SearchResults/SearchResults";
import useReactRouter from "use-react-router";
import { useBusinessSearch } from "../hooks/yelp-api/useBusinessSearch";
import { Pagination } from "./Pagination/Pagination";

export function Search() {
  const { location, history } = useReactRouter();
  const params = new URLSearchParams(location.search);
  const term = params.get("term");
  const locationParam = params.get("location");
  const priceParam = params.get("price");
  const radiusParam = params.get("radius");
  const offsetParam = params.get("offset");
  const [businesses, amountResults, searchParams, performSearch] =
    useBusinessSearch(
      term,
      locationParam,
      priceParam,
      radiusParam,
      offsetParam
    );

  if (!term || !locationParam) {
    history.push("/landing");
  }

  function search(term, location) {
    const encodedTerm = encodeURI(term);
    const encodedLocation = encodeURI(location);
    history.push(`/search?term=${encodedTerm}&location=${encodedLocation}`);
    performSearch({ term, location });
  }

  function searchWithFilter(term, location, price) {
    const encodedTerm = encodeURI(term);
    const encodedLocation = encodeURI(locationParam);
    const encodedPrice = price;

    history.push(
      `/search?term=${encodedTerm}&location=${encodedLocation}&price=${encodedPrice}`
    );
    performSearch({ term, location, price });
  }

  function searchWithRadiusFilter(term, location, radius) {
    const encodedTerm = encodeURI(term);
    const encodedLocation = encodeURI(locationParam);
    const encodedRadius = radius;

    history.push(
      `/search?term=${encodedTerm}&location=${encodedLocation}&radius=${encodedRadius}`
    );
    performSearch({ term, location, radius });
  }

  function nextPage(term, location, offset) {
    const encodedTerm = encodeURI(term);
    const encodedLocation = encodeURI(locationParam);
    const encodedOffset = offset;

    history.push(
      `/search?term=${encodedTerm}&location=${encodedLocation}&offset=${encodedOffset}`
    );
    performSearch({ term, location, offset });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //TODO: function to submit data to the DB
  }

  return (
    <div>
      <NavBar term={term} location={locationParam} search={search} />
      {/* <SubNav /> */}
      <SearchResultsSummary
        term={searchParams.term}
        location={searchParams.location}
        amountResults={amountResults}
        shownResults={businesses ? businesses.length : 0}
        searchWithFilter={searchWithFilter}
        searchWithRadiusFilter={searchWithRadiusFilter}
        search={search}
        handleSubmit={handleSubmit}
      />

      <SearchResults businesses={businesses} handleSubmit={handleSubmit} />
      <Pagination
        nextPage={nextPage}
        search={search}
        term={searchParams.term}
        location={searchParams.location}
      />
    </div>
  );
}
