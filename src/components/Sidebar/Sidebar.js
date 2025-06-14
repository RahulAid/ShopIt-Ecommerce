import React, { useEffect } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../../store/sidebarSlice";
import {
  fetchAsyncCategories,
  getAllCategories,
  fetchAsyncProductsOfCategory
} from "../../store/categorySlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);
  /* useEffect(() => {
    console.log("These are the categories",categories)
  }, [categories]); */

  return (
    <aside className={`sidebar ${isSidebarOn ? "hide-sidebar" : ""}`}>
      <button
        type="button"
        className="sidebar-hide-btn"
        onClick={() => dispatch(setSidebarOff())}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">
          All Categories
        </div>
        <ul className="cat-list">
          {
            categories.map((category, idx) => {
              return (
                <li key = {idx} onClick = {() => dispatch(setSidebarOff())}>
                  {/* <Link to = {`category/${category?.slug}`} className='cat-list-link text-capitalize'>{category?.name}</Link> */}
                  <Link className='cat-list-link text-capitalize' onClick={()=>dispatch(fetchAsyncProductsOfCategory(category?.slug))}>{category?.name}</Link>
                </li>
              )
            })
          }

        </ul>
      </div>
    </aside>
  );
};
{/* {category.slug.replace("-", " ")} */}
{/* {categories.map((category, idx) => (
  <li key={idx} onClick={() => dispatch(setSidebarOff())}>
    <Link
      to={`category/${category.slug}`}
      className="cat-list-link text-capitalize"
    >
      {category.name}
    </Link>
  </li>
))} */}

export default Sidebar;
