// src/pages/categories/CategoryOption.js
import React from "react";
import "./CategoryPage.css";

function CategoryOption({ title, icon, description, badge }) {
  return (
    <div className="category-card">
      <div className="category-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {badge && <span className="category-badge">{badge}</span>}
    </div>
  );
}

export default CategoryOption;