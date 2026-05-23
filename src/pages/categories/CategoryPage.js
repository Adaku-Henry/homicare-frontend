// src/pages/categories/CategoryPage.js
import React from "react";
import { Link } from "react-router-dom";
import "./CategoryPage.css";
import CategoryOption from "./CategoryOption";

// Sample data
const categories = [
  { id: 1, title: "Cleaning", description: "Home cleaning services", icon: "🧹", route: "cleaning", badge: "Hot" },
  { id: 2, title: "Laundry", description: "Wash & fold", icon: "🧺", route: "laundry", badge: "New" },
  { id: 3, title: "Plumbing", description: "Fix leaks & pipes", icon: "🚰", route: "plumbing" },
  { id: 4, title: "Cooking", description: "Home meals prepared", icon: "🍳", route: "cooking" },
  { id: 5, title: "Babysitting", description: "Trusted childcare", icon: "👶", route: "babysitting" },
  { id: 6, title: "Electrical", description: "Installations & repair", icon: "💡", route: "electrical" },
];

function CategoryPage() {
  return (
    <div className="category-page">
      <h1>All Categories & Activities</h1>

      <div className="categories-grid">
        {categories.map(cat => (
          <Link key={cat.id} to={`/category/${cat.route}`}>
            <CategoryOption
              title={cat.title}
              description={cat.description}
              icon={cat.icon}
              badge={cat.badge}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;