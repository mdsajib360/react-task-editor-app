import React, { useState } from "react";

const people = ["Faria", "Sajib", "Iliana"];

export default function Modal({ fileName, onClose, todo,image, handleInputChange, handleSave, handleImageChange, setAssignedTo, assignedTo }) {
  const [description, setDescription] = useState("");
  const [assignValue, setAssignValue ] = useState("")
  
  console.log(image);
  
  
  
  return (
   <form
  onSubmit={handleSave}
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-md">
    <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

    <label className="block mb-1 text-sm">Description:</label>
    <input
                  type="text"
                  value= {todo}
      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 mb-4"
      onChange={handleInputChange}
    />

        
        <label className="block mb-1 text-sm">Update Image:</label>

<div className="relative w-full mb-4">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
  />

  <div className="border border-gray-500 rounded-lg px-3 py-2 text-center text-gray-300 bg-gray-700">
  {fileName ? <p>Selected file: {fileName}  </p> : <p>No File Chosen</p> }
  </div>
</div>

{fileName && <p>Selected file: {fileName}</p>}

{image && (
  <div>
    <p>Image Preview:</p>
    <img src={image} alt="Preview" style={{ width: '30px' }} />
  </div>
)}

  
    <label className="block mb-1 text-sm">Assigned To:</label>
    <select
      className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 mb-4"
        value={assignedTo}
      onChange={(e)=>setAssignedTo(e.target.value)}
    >d
      <option defaultValue="">Select a person</option>
      {people.map((person) => (
        <option key={person} value={person}>
          {person}
        </option>
      ))}
    </select>

    <div className="flex justify-end space-x-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  </div>
</form>

  );
}
