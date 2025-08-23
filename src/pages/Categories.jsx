import React, { useEffect } from "react";
import Category from "../components/Category.jsx";
import "./Styles/Categories.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../redux/apiCall/categoryCall.jsx";
import { Link } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop.jsx";
import All from '../assets/allproducts.jpg'
const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <div className="Categories-main-div d-flex flex-column">
        <div className="d-flex gap-2 p-classname-title align-center-title">
          Our
          <span className="span-class-name-main">
            <p>Categories</p>
          </span>
        </div>

        <div className="Categories-main-div-child d-flex ">
          <Link to={"/allproducts"}>
            <Category category={"All Products"} image={All} />
          </Link>
          {categories.map((category) => (
            <Link
            key = {category._id}
              to={"/categoryproduct"}
              state={{ categoryId: category._id, categoryName: category.name }}
            >
              {" "}
              <Category
                key={category._id}
                category={category.name}
                image={category.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
