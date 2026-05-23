// src/pages/categories/CategorySubPage.js
import React from "react";
import { useParams } from "react-router-dom";
import "./CategorySubPage.css";
import ProviderCard from "../../features/profile/providers/ProviderCard";

// Sample providers
const allProviders = {
  cleaning: [
    { id: 1, name: "John Cleaning", rating: 4.8, activities: ["Deep Cleaning", "Carpet Cleaning"], image: "" },
    { id: 2, name: "Lucy Cleaning", rating: 4.7, activities: ["Window Cleaning", "Office Cleaning"], image: "" },
  ],
  electrical: [
    { id: 3, name: "Peter Electric", rating: 4.6, activities: ["Wiring", "Appliance Repair"], image: "" },
    { id: 4, name: "Mike Electric", rating: 4.7, activities: ["Installations", "Maintenance"], image: "" },
  ],
  plumbing: [
    { id: 5, name: "Sam Plumbing", rating: 4.5, activities: ["Pipe Repair", "Drain Cleaning"], image: "" },
  ],
  laundry: [
    { id: 6, name: "Mary Laundry", rating: 4.6, activities: ["Wash & Fold", "Ironing"], image: "" },
  ],
  cooking: [
    { id: 7, name: "Alice Cooking", rating: 4.9, activities: ["Meal Prep", "Catering"], image: "" },
  ],
  babysitting: [
    { id: 8, name: "Emma Babysitting", rating: 4.8, activities: ["Daycare", "Nightcare"], image: "" },
  ],
};

function CategorySubPage() {
  const { categoryName } = useParams();
  const providers = allProviders[categoryName.toLowerCase()] || [];

  return (
    <div className="category-subpage">
      <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Providers</h2>

      {providers.length === 0 ? (
        <p>No providers available for this category yet.</p>
      ) : (
        <div className="providers-grid">
          {providers.map(provider => (
            <ProviderCard key={provider.id} {...provider} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySubPage;