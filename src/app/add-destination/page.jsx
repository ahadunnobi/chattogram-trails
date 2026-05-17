"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AddDestinationPage() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData(e.target);
    const destinationData = {
      name: formData.get("destinationName"),
      region: formData.get("region"),
      tags: [formData.get("category")],
      cost: formData.get("price"),
      duration: formData.get("duration"),
      bestTime: formData.get("departureDate"),
      image: formData.get("imageUrl"),
      tagline: formData.get("description"),
      status: "good",
      rating: 0,
      reviewCount: 0,
      activities: [],
      difficulty: "Moderate",
      accommodations: []
    };

    fetch('http://localhost:5000/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(destinationData)
    })
    .then(res => res.json())
    .then(data => {
      setIsPending(false);
      alert("Destination added successfully!");
      e.target.reset();
    })
    .catch(err => {
      console.error(err);
      setIsPending(false);
      alert("Failed to add destination.");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-info py-8 px-10 text-white text-center">
            <h1 className="text-3xl font-bold">Add New Travel Package</h1>
            <p className="opacity-90 mt-2">Fill in the details to list a new destination in Chattogram.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Destination Name */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold">Destination Name</span>
                </label>
                <input 
                  name="destinationName" 
                  type="text" 
                  placeholder="e.g. Khoiyachara Waterfall" 
                  className="input input-bordered w-full rounded-2xl focus:input-info" 
                  required 
                />
              </div>

              {/* Sub-region / Country */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Sub-region</span>
                </label>
                <input 
                  name="region" 
                  type="text" 
                  placeholder="e.g. Mirsarai" 
                  className="input input-bordered w-full rounded-2xl focus:input-info" 
                  required 
                />
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Category</span>
                </label>
                <select name="category" className="select select-bordered w-full rounded-2xl focus:select-info" required>
                  <option value="" disabled selected>Select category</option>
                  <option value="Waterfall">Waterfall</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Beach">Beach</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Estimated Cost (BDT)</span>
                </label>
                <input 
                  name="price" 
                  type="number" 
                  placeholder="e.g. 2500" 
                  className="input input-bordered w-full rounded-2xl focus:input-info" 
                  required 
                />
              </div>

              {/* Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Duration</span>
                </label>
                <input 
                  name="duration" 
                  type="text" 
                  placeholder="e.g. 2 Days / 1 Night" 
                  className="input input-bordered w-full rounded-2xl focus:input-info" 
                  required 
                />
              </div>

              {/* Departure Date / Best Time */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold">Best Time to Visit / Date</span>
                </label>
                <input 
                  name="departureDate" 
                  type="text" 
                  placeholder="e.g. July - September (Monsoon)"
                  className="input input-bordered w-full rounded-2xl focus:input-info" 
                  required 
                />
              </div>

              {/* Image URL */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold">Image URL</span>
                </label>
                <input 
                  name="imageUrl" 
                  type="url" 
                  placeholder="https://example.com/photo.jpg" 
                  className="input input-bordered w-full rounded-2xl focus:input-info" 
                  required 
                />
              </div>

              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-bold">Description</span>
                </label>
                <textarea 
                  name="description" 
                  placeholder="Describe the travel experience, trails, and what to expect..." 
                  className="textarea textarea-bordered h-32 rounded-2xl focus:textarea-info" 
                  required 
                ></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className={`btn btn-info w-full text-white rounded-xl text-lg font-bold shadow-lg shadow-info/20 transition-all active:scale-95 ${isPending ? 'loading' : ''}`}
              >
                {isPending ? "Adding Destination..." : "Add Travel Package"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}