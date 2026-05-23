import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceCategories() {
  const navigate = useNavigate();

  const services = [
    { name: "Cleaning", description: "Professional home cleaning", path: "/services?category=cleaning" },
    { name: "Laundry", description: "Wash and fold services", path: "/services?category=laundry" },
    { name: "Cooking", description: "Home meal preparation", path: "/services?category=cooking" },
    { name: "Babysitting", description: "Trusted child care", path: "/services?category=babysitting" },
    { name: "Plumbing", description: "Water and pipe repairs", path: "/services?category=plumbing" },
    { name: "Electrician", description: "Electrical installations", path: "/services?category=electrician" }
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Service Categories</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: "20px"
      }}>
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}
          >
            <h3>{service.name}</h3>
            <p>{service.description}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(service.path);
              }}
              style={{
                marginTop: "10px",
                background: "#f97316",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCategories;