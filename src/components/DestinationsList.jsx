"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DestinationsList() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/destinations')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        setDestinations(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load destinations. Make sure the server is running on port 5000.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-spinner loading-lg text-info"></span>
        <p className="mt-4 text-gray-500">Loading destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="alert alert-error max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map(dest => (
          <div key={dest.id} className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            <figure className="relative h-56 bg-gray-200 overflow-hidden">
              {dest.image ? (
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${dest.imageGradient || 'from-info to-primary'} group-hover:scale-105 transition-transform duration-500`}></div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                {dest.region && (
                  <span className="badge badge-neutral shadow-sm capitalize">{dest.region}</span>
                )}
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl mb-1">{dest.name}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{dest.tagline}</p>
              
              <div className="flex flex-wrap gap-2 my-3">
                {dest.difficulty && (
                  <span className={`badge badge-sm badge-outline ${
                    dest.difficulty === 'Easy' ? 'badge-success' : 
                    dest.difficulty === 'Moderate' ? 'badge-warning' : 'badge-error'
                  }`}>{dest.difficulty}</span>
                )}
                {dest.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="badge badge-sm badge-ghost">{tag}</span>
                ))}
              </div>

              <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                  <span className="text-sm font-bold">{dest.rating || "New"}</span>
                </div>
                <Link href={`/destination/${dest.id}`} className="btn btn-sm btn-info text-white">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!isLoading && destinations.length === 0 && !error && (
        <div className="text-center py-20 text-gray-500">
          <p>No destinations found. Add some from the Admin Dashboard!</p>
        </div>
      )}
    </div>
  );
}
