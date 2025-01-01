import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LecturerModal = ({
  handleCloseModal,
  onLecturerAdded,
  selectedLecturer,
}) => {
  const [formData, setFormData] = useState(
    selectedLecturer || {
      _id: "",
      name: "",
      email: "",
      password: "",
      DOB: "",
      contact_no: "",
      student_id: "",
      NIC: "",
    }
  );
  const navigate = useNavigate();

  // Prefill the form if editing an existing lecturer
  useEffect(() => {
    if (selectedLecturer) {
      setFormData(selectedLecturer);
    }
  }, [selectedLecturer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include the type field as "lecturer" in the payload
      const payload = { ...formData, type: "lecturer" };
      const url = selectedLecturer
        ? `http://localhost:4000/api/user/update-lecterers/${selectedLecturer._id}`
        : "http://localhost:4000/api/user/register";
      const method = selectedLecturer ? "put" : "post";
      const { data } = await axios[method](url, payload);

      alert(
        `Lecturer ${selectedLecturer ? "updated" : "created"} successfully!`
      );
      onLecturerAdded(formData);

      handleCloseModal();
    } catch (error) {
      console.error("Error saving lecturer:", error.response?.data || error);
      alert(
        error.response?.data?.error ||
          "An error occurred while saving the lecturer."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">
          {selectedLecturer ? "Edit Lecturer" : "Add a New Lecturer"}
        </h3>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {Object.keys(formData)
            .filter((key) => key !== "__v" && key !== "type") // Exclude unnecessary fields
            .map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {key.replace(/_/g, " ").toUpperCase()}
                </label>
                <input
                  type={key === "DOB" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  placeholder={`Enter ${key.replace(/_/g, " ")}`}
                  disabled={key === "_id" && selectedLecturer} // Disable ID field when editing
                />
              </div>
            ))}
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCloseModal}
            className="border border-gray-300 text-gray-700 py-2 px-4 rounded mr-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {selectedLecturer ? "Update Lecturer" : "Create Lecturer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LecturerModal;
