// src/components/FormFields.js
export const InputField = ({ id, label, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
      required
    />
  </div>
);

export const SelectField = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
    >
      <option value="">Select a category</option>
      {options.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);
