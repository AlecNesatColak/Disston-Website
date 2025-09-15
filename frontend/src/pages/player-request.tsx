import React, { useState } from "react";
import positions from "../models/enums/position-enum";
// Only allow user to fill out these fields

const initialForm = {
  first_name: "",
  last_name: "",
  position: "",
  jersey_number: "",
  email: "",
  phone_number: "",
  profile_image_url: "",
};

const PlayerRequestForm: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.first_name.trim()) return "First name is required";
    if (!form.last_name.trim()) return "Last name is required";
    if (!form.position) return "Position is required";
    
    if (form.jersey_number && (parseInt(form.jersey_number) < 0 || parseInt(form.jersey_number) > 99)) {
      return "Jersey number must be between 0 and 99";
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address";
    }
    
    if (form.phone_number && form.phone_number.length < 7) {
      return "Phone number must be at least 7 characters";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    // Prepare payload, only send user-editable fields
    const payload: Record<string, string | number | null> = {
      ...form,
      jersey_number: form.jersey_number ? Number(form.jersey_number) : null,
    };

    // Remove empty optional fields
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "") {
        delete payload[key];
      }
    });

    try {
      const res = await fetch("https://disston-website.onrender.com/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = "Failed to submit player request.";
        
        // Handle different types of API errors
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // Validation errors from FastAPI
            errorMessage = errorData.detail.map((err: { msg: string }) => err.msg).join(", ");
          } else {
            errorMessage = errorData.detail;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        throw new Error(errorMessage);
      }

      const result = await res.json();
      setSuccess(true);
      setForm(initialForm);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while submitting your application.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Disston City</h1>
          <p className="text-gray-600">Submit your player application to join our team</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Player Application Form</h2>
            <p className="text-blue-100 text-sm mt-1">Please fill out all required fields</p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">1</span>
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      minLength={1}
                      maxLength={50}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                      minLength={1}
                      maxLength={50}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              {/* Position & Jersey Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm mr-3">2</span>
                  Playing Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select position</option>
                      {positions.map((pos) => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jersey Number
                    </label>
                    <input
                      type="number"
                      name="jersey_number"
                      value={form.jersey_number}
                      onChange={handleChange}
                      min={0}
                      max={99}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="0-99 (optional)"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm mr-3">3</span>
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={form.phone_number}
                      onChange={handleChange}
                      minLength={7}
                      maxLength={20}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      name="profile_image_url"
                      value={form.profile_image_url}
                      onChange={handleChange}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Application...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <span className="text-green-700 font-medium">Application submitted successfully!</span>
                      <p className="text-green-600 text-sm mt-1">Thank you for your interest in joining Disston City. We will review your application and contact you within 48 hours.</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>By submitting this form, you agree to our terms and conditions.</p>
          <p className="mt-1">We will review your application and contact you within 48 hours.</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerRequestForm;
