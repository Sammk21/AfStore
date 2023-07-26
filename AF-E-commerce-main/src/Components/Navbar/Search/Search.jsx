import React, { useEffect, useState } from "react";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useState";
import { MdClose } from "react-icons/md";
import { API_URL } from "../../../Utils/url";

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  let { products } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${debouncedQuery}`
  );

  useEffect(() => {
    // This effect runs whenever the debouncedQuery changes
    if (debouncedQuery.length) {
      // Make the API call with the debouncedQuery
      console.log("API call with query:", debouncedQuery);
    } else {
      // Reset the products to null when the query is empty
      products = null;
    }
  }, [debouncedQuery]);

  const onChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Clear the previous debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Create a new debounce timer
    const newDebounceTimer = setTimeout(() => {
      setDebouncedQuery(newQuery);
    }, 800); // Adjust the delay time (in milliseconds) as per your requirement

    // Store the new timer ID
    setDebounceTimer(newDebounceTimer);
  };


  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <MdClose className="close-btn" onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        {!products?.data?.length && (
          <div className="start-msg">
            Our search algorithm is still learning if you want better result we
            highly suggest you to browse navigation bar
          </div>
        )}
        <div className="search-results">
          {products?.data?.map((item) => (
            <div
              className="search-result-item"
              key={item.id}
              onClick={() => {
                navigate("/product/" + item.id);
                setShowSearch(false);
              }}
            >
              <div className="image-container">
                <img
                  src={API_URL + item.attributes.image.data[0].attributes.url}
                />
              </div>
              <div className="prod-details">
                <span className="name">{item.attributes.title}</span>
                <span className="desc">{item.attributes.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
