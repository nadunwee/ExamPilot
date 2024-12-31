import axios from "axios";
import { useEffect, useState } from "react";

const AddExamModel = ({ handleCloseModal, onExamAdded, selectedExam }) => {
  const [formData, setFormData] = useState(
    selectedExam || {
      id: "",
      name: "",
      duration: "",
      module_code: "",
      description: "",
      subject_area: "",
      module: "",
      semester: "",
      assigned_lecturer: "",
      start_date: "",
      no_of_questions: "",
    }
  );

  // Format start_date if selectedExam is provided
  useEffect(() => {
    if (selectedExam) {
      const formattedExam = {
        ...selectedExam,
        start_date: selectedExam.start_date
          ? new Date(selectedExam.start_date).toISOString().split("T")[0]
          : "",
      };
      setFormData(formattedExam);
    }
  }, [selectedExam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = selectedExam
        ? `http://localhost:4000/api/exam/update-exam/${selectedExam._id}`
        : "http://localhost:4000/api/exam/create-exam";
      const method = selectedExam ? "put" : "post";
      const response = await axios[method](url, formData);

      alert(`Exam ${selectedExam ? "updated" : "created"} successfully!`);
      onExamAdded(response.data.exam);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
          "An error occurred while saving the exam."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">
          {selectedExam ? "Edit Exam" : "Add a New Exam"}
        </h3>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">
                {key.replace(/_/g, " ").toUpperCase()}
              </label>
              <input
                type={key === "start_date" ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
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
            {selectedExam ? "Update Exam" : "Create Exam"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExamModel;
