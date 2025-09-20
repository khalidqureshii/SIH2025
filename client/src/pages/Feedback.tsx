import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    issueType: "",
    subject: "",
    description: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setFeedbackData([
        {
          issueType: "complaint",
          subject: "App crashes sometimes",
          description: "Whenever I open the weather section, the app freezes.",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setFeedbackData([...feedbackData, formData]);
      setFormData({ issueType: "", subject: "", description: "" });
      setLoading(false);
      alert("Feedback submitted successfully!");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-green-600 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl mt-6 p-6">
        {/* increased width */}
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Issue Type + Subject */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Issue Type
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                className="mt-1 w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="" disabled>
                  -- Select Issue Type --
                </option>
                <option value="feature request">Feature Request</option>
                <option value="complaint">Complaint</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-8">
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="mt-1 w-full border border-green-400 bg-green-50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed description"
              className="mt-1 w-full border border-green-400 bg-green-50 rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
        {/* Feedback List */}
        {feedbackData.length > 0 && (
          <div className="mt-6 space-y-4">
            {feedbackData.map((feedback, i) => (
              <div
                key={i}
                className="bg-green-50 border border-green-200 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-green-700 mb-2">
                  Feedback: {i + 1}
                </h3>
                <p>
                  <strong>Type:</strong> {feedback.issueType}
                </p>
                <p>
                  <strong>Subject:</strong> {feedback.subject}
                </p>
                <p>
                  <strong>Description:</strong> {feedback.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
