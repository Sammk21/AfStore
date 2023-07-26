import { React, useContext, useState } from "react";
import "../../MobileMenu/MobileMenu.scss";
import { AiOutlineClose } from "react-icons/ai";
import useFetch from "../../../Hooks/useState";
import { Context } from "../../../Utils/Context";
const FilterMenu = ({ categoryid , setShowFilterMenu ,  onFiltersSelected}) => {
 
  const {selected, setSelected ,  checkedItems, setCheckedItems} = useContext(Context)

  const products = useFetch(
    `/api/subcategories?[filters][categories][id][$eq]=${categoryid}`
  );

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedItems((prevState) => ({
      ...prevState,
      [value]: isChecked,
    }));

    setSelected(
      isChecked
        ? [...selected, value]
        : selected.filter((item) => item !== value)
    );
  };

  const handleFilterSubmit = () => {
    onFiltersSelected(selected);
    setShowFilterMenu(false);
  };

  return (
    <>
      <aside>
        <menu className="menu-panel">
          <div
            className="opac-layer"
            onClick={() => setShowFilterMenu(false)}
          ></div>
          <menu className="menu-content">
            <div className="title">
              <div className="close">
                <span
                  className="close-btn"
                  onClick={() => setShowFilterMenu(false)}
                >
                  <span className="link">
                    <AiOutlineClose />
                  </span>
                </span>
              </div>
              <h2>Filters</h2>
              <div className="line"></div>
              <div className="categories">
                {products?.products?.data?.map((subcategory) => (
                  <div className="form-group item" key={subcategory.id}>
                   

                    <label
                      htmlFor={subcategory.id}
                      className="custom-control custom-checkbox"
                    >
                      <input
                        onChange={handleChange}
                        checked={checkedItems[subcategory.id] || false}
                        value={subcategory.id}
                        id={subcategory.id}
                        type="checkbox"
                        className="custom-control-input"
                        />
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description">
                        {subcategory.attributes.name}
                      </span>
                    </label>
                       
                  </div>
                ))}
                <div className="form-group">
                  <div classNameName="line"></div>
                  <button  onClick={handleFilterSubmit} type="submit" className="btn-block">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </menu>
        </menu>
      </aside>
    </>
  );
};

export default FilterMenu;
