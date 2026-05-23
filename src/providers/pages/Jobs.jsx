import React, { useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Home Plumbing Fix",
      customer: "John Doe",
      location: "Kampala",
      price: 50000,
      status: "pending",
      priority: "high",
      description: "Fix leaking kitchen sink and pipe replacement",
    },
    {
      id: 2,
      title: "Electrical Repair",
      customer: "Sarah Jane",
      location: "Entebbe",
      price: 80000,
      status: "accepted",
      priority: "medium",
      description: "Fix house wiring and switch replacement",
    },
    {
      id: 3,
      title: "Laundry Service",
      customer: "David Kim",
      location: "Ntinda",
      price: 20000,
      status: "completed",
      priority: "low",
      description: "Wash and iron clothes for family of 4",
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ================= ACCEPT JOB =================
  const acceptJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "accepted" } : job
      )
    );
  };

  // ================= REJECT JOB =================
  const rejectJob = (id) => {
    setJobs((prev) =>
      prev.filter((job) => job.id !== id)
    );
  };

  // ================= COMPLETE JOB =================
  const completeJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "completed" } : job
      )
    );
  };

  // ================= FILTERED JOBS =================
  const filteredJobs = jobs.filter((job) => {
    const matchFilter = filter === "all" || job.status === filter;
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.customer.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div style={container}>

      {/* ================= HEADER ================= */}
      <div style={header}>
        <h2>Provider Jobs</h2>
        <p>Manage incoming and active jobs</p>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div style={filterBar}>
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={input}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={select}
        >
          <option value="all">All Jobs</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* ================= JOB LIST ================= */}
      <div style={grid}>
        {filteredJobs.length === 0 ? (
          <div style={empty}>
            No jobs found
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} style={card}>

              {/* TITLE */}
              <h3>{job.title}</h3>

              {/* INFO */}
              <p><b>Customer:</b> {job.customer}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Price:</b> UGX {job.price}</p>

              {/* PRIORITY */}
              <span style={{
                ...badge,
                background:
                  job.priority === "high"
                    ? "red"
                    : job.priority === "medium"
                    ? "orange"
                    : "green",
              }}>
                {job.priority.toUpperCase()}
              </span>

              {/* STATUS */}
              <p>
                <b>Status:</b>{" "}
                <span style={{
                  color:
                    job.status === "completed"
                      ? "green"
                      : job.status === "accepted"
                      ? "blue"
                      : "orange",
                }}>
                  {job.status}
                </span>
              </p>

              {/* ACTIONS */}
              <div style={actions}>
                {job.status === "pending" && (
                  <>
                    <button
                      style={acceptBtn}
                      onClick={() => acceptJob(job.id)}
                    >
                      Accept
                    </button>

                    <button
                      style={rejectBtn}
                      onClick={() => rejectJob(job.id)}
                    >
                      Reject
                    </button>
                  </>
                )}

                {job.status === "accepted" && (
                  <button
                    style={completeBtn}
                    onClick={() => completeJob(job.id)}
                  >
                    Mark Completed
                  </button>
                )}

                <button
                  style={viewBtn}
                  onClick={() => setSelectedJob(job)}
                >
                  View
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedJob && (
        <div style={modal}>
          <div style={modalContent}>

            <h2>{selectedJob.title}</h2>

            <p>{selectedJob.description}</p>

            <p><b>Customer:</b> {selectedJob.customer}</p>
            <p><b>Location:</b> {selectedJob.location}</p>
            <p><b>Price:</b> UGX {selectedJob.price}</p>
            <p><b>Status:</b> {selectedJob.status}</p>

            <button
              style={closeBtn}
              onClick={() => setSelectedJob(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "20px",
  background: "#f4f6fb",
  minHeight: "100vh",
};

const header = {
  marginBottom: "20px",
};

const filterBar = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const select = {
  padding: "10px",
  borderRadius: "8px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
};

const card = {
  background: "#fff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
};

const badge = {
  padding: "4px 8px",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "12px",
};

const actions = {
  marginTop: "10px",
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
};

const acceptBtn = {
  padding: "5px 10px",
  background: "green",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

const rejectBtn = {
  padding: "5px 10px",
  background: "red",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

const completeBtn = {
  padding: "5px 10px",
  background: "blue",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

const viewBtn = {
  padding: "5px 10px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

const empty = {
  textAlign: "center",
  padding: "20px",
  color: "#777",
};

const modal = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalContent = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
};

const closeBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "black",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};