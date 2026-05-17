"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modalMode, setModalMode] = useState(null); // 'add', 'edit', 'view'
  const [selectedDest, setSelectedDest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef(null);

  const initialForm = {
    name: "",
    region: "sitakunda",
    tagline: "",
    difficulty: "Easy",
    status: "good",
    statusNote: "",
    rating: 4.5,
    reviewCount: 0,
    imageGradient: "from-blue-500 via-indigo-500 to-purple-500"
  };

  const [formData, setFormData] = useState(initialForm);

  // 1. Fetch All Destinations
  const fetchDestinations = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load destinations", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Open Modal helpers
  const openModal = (mode, dest = null) => {
    setModalMode(mode);
    if (mode === "add") {
      setFormData(initialForm);
      setSelectedDest(null);
    } else if (mode === "edit" && dest) {
      setFormData({
        name: dest.name || "",
        region: dest.region || "sitakunda",
        tagline: dest.tagline || "",
        difficulty: dest.difficulty || "Easy",
        status: dest.status || "good",
        statusNote: dest.statusNote || "",
        rating: dest.rating || 4.5,
        reviewCount: dest.reviewCount || 0,
        imageGradient: dest.imageGradient || initialForm.imageGradient
      });
      setSelectedDest(dest);
    } else if (mode === "view" && dest) {
      // 2. Fetch Single Destination
      fetch(`http://localhost:5000/destinations/${dest._id || dest.id}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedDest(data);
        })
        .catch((err) => console.error("Error fetching single destination", err));
    }
    
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setModalMode(null);
    setSelectedDest(null);
    setFormData(initialForm);
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3 & 4. Add or Edit Destination
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isEdit = modalMode === "edit";
    const url = isEdit
      ? `http://localhost:5000/destinations/${selectedDest._id || selectedDest.id}`
      : "http://localhost:5000/destinations";
      
    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        fetchDestinations();
        closeModal();
      })
      .catch((err) => console.error("Error saving destination", err))
      .finally(() => setIsSubmitting(false));
  };

  // 5. Remove Destination
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this destination? This action cannot be undone.")) {
      fetch(`http://localhost:5000/destinations/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          setDestinations(destinations.filter((d) => (d._id || d.id) !== id));
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete destination");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Destinations</h1>
            <p className="text-gray-500 mt-2 text-lg">Manage regions, spots, and trails across Chattogram.</p>
          </div>
          <button
            onClick={() => openModal("add")}
            className="btn btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Destination
          </button>
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        ) : destinations.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">No destinations found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first destination.</p>
            <button onClick={() => openModal("add")} className="btn btn-outline btn-primary rounded-xl">
              Add Destination
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div 
                key={dest._id || dest.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
              >
                {/* Card Image Area (Gradient) */}
                <div className={`h-40 w-full bg-gradient-to-br ${dest.imageGradient || 'from-slate-400 to-slate-500'} relative p-5 flex items-start justify-between`}>
                  <span className="badge border-none shadow-sm capitalize font-medium px-3 py-1 bg-white/90 text-slate-800 backdrop-blur-md">
                    {dest.region}
                  </span>
                  <span className={`badge border-none shadow-sm text-white font-medium px-3 py-1 ${
                    dest.difficulty === 'Easy' ? 'bg-emerald-500/90' : 
                    dest.difficulty === 'Moderate' ? 'bg-amber-500/90' : 'bg-red-500/90'
                  } backdrop-blur-md`}>
                    {dest.difficulty}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{dest.name}</h3>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg text-sm font-semibold text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {dest.rating}
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                    {dest.tagline || "No description available for this destination."}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      dest.status === 'good' ? 'bg-emerald-500' : 
                      dest.status === 'caution' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-xs font-medium text-gray-600 capitalize">
                      Status: {dest.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => openModal("view", dest)}
                      className="btn btn-sm btn-ghost bg-gray-50 hover:bg-gray-100 flex-1 rounded-xl text-gray-700"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => openModal("edit", dest)}
                      className="btn btn-sm btn-ghost bg-indigo-50 hover:bg-indigo-100 flex-1 rounded-xl text-indigo-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(dest._id || dest.id)}
                      className="btn btn-sm btn-ghost bg-red-50 hover:bg-red-100 flex-none px-3 rounded-xl text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Modal for Add, Edit, View */}
      <dialog ref={modalRef} className="modal backdrop-blur-sm">
        <div className="modal-box max-w-3xl rounded-3xl p-0 overflow-hidden bg-white">
          
          {/* View Single Destination Mode */}
          {modalMode === "view" && selectedDest && (
            <div>
              <div className={`h-48 w-full bg-gradient-to-br ${selectedDest.imageGradient || 'from-slate-400 to-slate-500'} relative p-8 flex flex-col justify-end`}>
                <button onClick={closeModal} className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border-none">✕</button>
                <div className="flex items-center gap-3 mb-2">
                  <span className="badge border-none bg-white/90 text-slate-800 font-medium capitalize shadow-sm backdrop-blur-md">{selectedDest.region}</span>
                  <span className="badge border-none bg-white/90 text-slate-800 font-medium shadow-sm backdrop-blur-md">{selectedDest.difficulty}</span>
                </div>
                <h2 className="text-3xl font-bold text-white drop-shadow-md">{selectedDest.name}</h2>
              </div>
              
              <div className="p-8">
                <p className="text-lg text-gray-700 font-medium mb-6">{selectedDest.tagline}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Status Details</h4>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-3 h-3 rounded-full ${
                        selectedDest.status === 'good' ? 'bg-emerald-500' : 
                        selectedDest.status === 'caution' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></span>
                      <span className="font-semibold text-gray-900 capitalize">{selectedDest.status}</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedDest.statusNote || "No specific status notes."}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-3">Metrics</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{selectedDest.rating} <span className="text-amber-400 text-lg">★</span></div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                      <div className="w-px h-10 bg-gray-200"></div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{selectedDest.reviewCount}</div>
                        <div className="text-xs text-gray-500">Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button onClick={closeModal} className="btn rounded-xl">Close</button>
                  <button onClick={() => openModal("edit", selectedDest)} className="btn btn-primary rounded-xl">Edit Destination</button>
                </div>
              </div>
            </div>
          )}

          {/* Add / Edit Form Mode */}
          {(modalMode === "add" || modalMode === "edit") && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {modalMode === "add" ? "Add New Destination" : "Edit Destination"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Fill in the details below to {modalMode === "add" ? "create a new" : "update the"} destination.
                  </p>
                </div>
                <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="form-control">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Destination Name</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input input-bordered bg-gray-50 rounded-xl focus:bg-white" placeholder="e.g., Khoiyachara Waterfall" />
                  </div>

                  {/* Region */}
                  <div className="form-control">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Region</span></label>
                    <select name="region" value={formData.region} onChange={handleChange} className="select select-bordered bg-gray-50 rounded-xl focus:bg-white">
                      <option value="sitakunda">Sitakunda</option>
                      <option value="mirsarai">Mirsarai</option>
                      <option value="bhatiari">Bhatiari</option>
                      <option value="hathazari">Hathazari</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Tagline */}
                  <div className="form-control md:col-span-2">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Short Tagline</span></label>
                    <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} required className="input input-bordered bg-gray-50 rounded-xl focus:bg-white" placeholder="e.g., A cascading 11-tier waterfall deep in the hills..." />
                  </div>

                  {/* Difficulty */}
                  <div className="form-control">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Difficulty</span></label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="select select-bordered bg-gray-50 rounded-xl focus:bg-white">
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Hard">Hard</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="form-control">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Current Status</span></label>
                    <select name="status" value={formData.status} onChange={handleChange} className="select select-bordered bg-gray-50 rounded-xl focus:bg-white">
                      <option value="good">Good (Open)</option>
                      <option value="caution">Caution (Be Careful)</option>
                      <option value="avoid">Avoid (Closed/Dangerous)</option>
                    </select>
                  </div>

                  {/* Status Note */}
                  <div className="form-control md:col-span-2">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Status Note (Optional)</span></label>
                    <input type="text" name="statusNote" value={formData.statusNote} onChange={handleChange} className="input input-bordered bg-gray-50 rounded-xl focus:bg-white" placeholder="e.g., Trails open. Local guides mandatory." />
                  </div>

                  {/* Card Gradient */}
                  <div className="form-control md:col-span-2">
                    <label className="label font-semibold text-gray-700"><span className="label-text">Cover Gradient (Tailwind classes)</span></label>
                    <input type="text" name="imageGradient" value={formData.imageGradient} onChange={handleChange} className="input input-bordered bg-gray-50 rounded-xl focus:bg-white font-mono text-sm" placeholder="from-cyan-500 via-teal-400 to-emerald-600" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 mt-8 border-t border-gray-100">
                  <button type="button" onClick={closeModal} className="btn btn-ghost rounded-xl">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/30">
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : modalMode === "add" ? (
                      "Create Destination"
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Backdrop clicking closes modal */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}
