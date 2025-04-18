"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { FaCamera, FaUpload, FaCheck, FaHome, FaInfoCircle } from 'react-icons/fa';

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePhoto = () => {
    alert("Camera functionality will open your device camera when implemented.");
  };

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setDiagnosis(null); // Clear previous diagnosis when new image is selected
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(
        "https://appalling-celestina-pitamcclav-f89ea239.koyeb.app/api/diagnoses/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId: "device-130-abc",
            imageUrl: "https://storage.example.com/images/banana-leaf-1.jpg", // Placeholder
          }),
        }
      );
  
      const data = await response.json();
      console.log(data);
  
      // Ensure `setDiagnosis` gets only relevant info (like disease name)
      setDiagnosis(data);
    } catch (error) {
      console.error("Error fetching API:", error);
      
    }
  
    setIsLoading(false);
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-green-600">Banana Disease Detection</h1>
          <Link href="/home" className="flex items-center text-green-600 hover:text-green-800 transition-colors">
            <FaHome className="mr-2" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Banana Leaf Image</h2>
            
            {/* Drag & Drop Area */}
            <div 
              className={`w-full h-64 border-2 ${isDragging ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-300'} rounded-lg p-4 mb-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              {selectedImage ? (
                <>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="max-h-48 max-w-full object-contain rounded-lg mb-2"
                  />
                  <p className="text-sm text-gray-500 mt-2">Click or drag to change image</p>
                </>
              ) : (
                <>
                  <FaUpload className="text-4xl text-green-500 mb-3" />
                  <p className="text-gray-600 mb-1">
                    {isDragging ? 'Drop your image here' : 'Drag & drop an image'}
                  </p>
                  <p className="text-sm text-gray-500">or click to browse files</p>
                </>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={handleTakePhoto}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaCamera />
                <span>Take Photo</span>
              </button>
              
              <button
                onClick={() => document.getElementById('fileInput')?.click()}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaUpload />
                <span>Upload Image</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedImage || isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors ${!selectedImage || isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <FaCheck />
                  Analyze Image
                </>
              )}
            </button>
          </div>

          {/* Right Column - Results & Info */}
          <div className="space-y-6">
            {/* Diagnosis Result */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Diagnosis</h2>
              {diagnosis && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Diagnosis Result:</h3>
                <div className="space-y-2 text-gray-800">
                  <p><span className="font-bold">Result:</span> {diagnosis.result}</p>
                  <p><span className="font-bold">Confidence Level:</span> {diagnosis.confidenceLevel}%</p>
                  <p><span className="font-bold">Processing Time:</span> {diagnosis.processingTime}ms</p>
                  <p><span className="font-bold">Remaining Attempts:</span> {diagnosis.remainingAttempts}</p>
                </div>
                    
                  </div>
                )}


            {/* Tips Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Tips for Best Results</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Take photos in good lighting conditions
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Focus on affected leaves (if any)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Avoid shadows on the leaves
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Capture both sides of the leaf if possible
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
