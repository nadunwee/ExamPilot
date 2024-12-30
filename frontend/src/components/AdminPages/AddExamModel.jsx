const AddExamModel = ({ handleCloseModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">add a new exam</h3>
        <form className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              name of the exam
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter exam name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter duration"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Module code
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter module code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject Area
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter subject area"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Module</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter module"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter semester"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Assigned Lecturer
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter lecturer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input type="date" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              preferred no of questions
            </label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter no of questions"
            />
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCloseModal}
            className="border border-gray-300 text-gray-700 py-2 px-4 rounded mr-2 hover:bg-gray-100"
          >
            cancel
          </button>
          <button className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700">
            create the exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExamModel;
