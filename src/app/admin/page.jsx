"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Connected to CTG-trails-server API
  useEffect(() => {
    fetch('http://localhost:6969/destinations')
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setIsLoading(false);
      })
      .catch(err => console.error("Failed to load destinations", err));
  }, []);

  const handleDelete = (id) => {
    if(confirm("Are you sure you want to delete this destination?")) {
      fetch(`http://localhost:6969/destinations/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          setDestinations(destinations.filter(d => d.id !== id));
          alert("Destination deleted successfully");
        })
        .catch(err => {
          console.error(err);
          alert("Failed to delete destination");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage all destinations (Add, Edit, Delete)</p>
          </div>
          <a href="/add-destination" className="btn btn-info text-white shadow-sm">
            + Add New Destination
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10">
                      <span className="loading loading-spinner loading-lg text-info"></span>
                    </td>
                  </tr>
                ) : (
                  destinations.map((dest) => (
                    <tr key={dest.id} className="hover:bg-gray-50">
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-gray-900">{dest.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{dest.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost capitalize">{dest.region}</span>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${
                          dest.difficulty === 'Easy' ? 'badge-success' : 
                          dest.difficulty === 'Moderate' ? 'badge-warning' : 'badge-error'
                        }`}>{dest.difficulty}</span>
                      </td>
                      <td>
                        <span className={`badge badge-sm ${
                          dest.status === 'good' ? 'badge-success text-white' : 
                          dest.status === 'caution' ? 'badge-warning text-white' : 'badge-error text-white'
                        }`}>{dest.status}</span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-outline btn-info">Edit</button>
                          <button 
                            className="btn btn-sm btn-outline btn-error"
                            onClick={() => handleDelete(dest.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
                {!isLoading && destinations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">No destinations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
