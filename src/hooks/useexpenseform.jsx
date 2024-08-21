// src/hooks/useExpenseForm.js
import { useState } from "react";

const useExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setFormData({ amount: "", description: "", date: "", category: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    handleReset();
  };

  return {
    formData,
    handleChange,
    handleReset,
    handleSubmit,
    submittedData,
  };
};

export default useExpenseForm;
