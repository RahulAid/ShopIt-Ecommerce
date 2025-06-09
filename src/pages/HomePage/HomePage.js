import React, { useEffect } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  fetchAsyncCategories,
  getAllProductsByCategory,
  getCategoryProductsStatus,
} from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    console.log("This is the category", categoryProducts);
  }, [categoryProducts]);

  const products = useSelector(getAllProducts);

  const productStatus = useSelector(getAllProductsStatus);

  // randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  /* let catProductsOne = products.filter(
    (product) => product.category === categories[0].slug
  );

  let catProductsTwo = products.filter(
    (product) => product.category === categories[1].slug
  );
  let catProductsThree = products.filter(
    (product) => product.category === categories[2].slug
  );
  let catProductsFour = products.filter(
    (product) => product.category === categories[3].slug
  );
  let catProductsFive = products.filter(
    (product) => product.category === categories[4].slug
  );
  let catProductsSix = products.filter(
    (product) => product.category === categories[5].slug
  );
  let catProductsSeven = products.filter(
    (product) => product.category === categories[6].slug
  ); */

  const categoryProductMap = {};

  // Loop over each category
  categories.forEach((category) => {
    const slug = category.slug;

    // Filter products matching the current category
    const productsInCategory = products.filter(
      (product) => product.category === slug
    );

    // Store them in the map under the slug key
    categoryProductMap[slug] = productsInCategory;
  });

  useEffect(() => {
    console.log("This is the category Product Map", categoryProductMap);
  }, [categoryProductMap]);

  return (
    <main>
      <div className="slider-wrapper">
        {categoryProductsStatus !== 'SUCCEEDED' ? (
          <HeaderSlider />
        ) : (
          <div className="main-content bg-whitesmoke">
            <div className="container">
              <div className="categories py-5">
                <div className="categories-item">
                  <div className="title-md">
                    <ProductList products={categoryProducts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>See our products</h3>
              </div>

              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={tempProducts} />
              )}
            </div>

            {categories.map((category) => (
              <div className="categories-item" key={category.slug}>
                <div className="title-md">
                  <h3>{category.name}</h3>
                </div>
                {productStatus === STATUS.LOADING ? (
                  <Loader />
                ) : (
                  <ProductList
                    products={categoryProductMap[category.slug] || []}
                  />
                )}
              </div>
            ))}

            {/* <div className="categories-item">
              <div className="title-md">
                <h3>{categories[0]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsOne} />
              )}
            </div> */}

            {/* <div className="categories-item">
              <div className="title-md">
                <h3>{categories[1]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsTwo} />
              )}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[2]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsThree} />
              )}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[3]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={catProductsFour} />
              )}
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
