import React, { useState, useEffect } from "react";

export default function Form({ name, initialInput }) {
  const [formState, setFormState] = useState({});
  const [formName, setFormName] = useState(name);
  const [error, setError] = useState([]);

  useEffect(() => {
    setFormState(initialInput);
  }, [initialInput]);

  const handleNameChange = (event) => {
    setFormName(event.target.value);
  }

  const handleChange = (path) => (event) => {
    setFormState((prevState) => {
      const newState = { ...prevState };
      let node = newState;
      for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]];
      }
      node[path[path.length - 1]] = event.target.value;
      return newState;
    });
  };

  const renderForm = (node, path = []) => {
    return Object.keys(node).map((key) => {
      const type = node[key];
      const newPath = [...path, key];

      if (Array.isArray(type)) {
        return (
          <div key={newPath.join(".")} className="pl-4">
            <label className="block font-medium">{key}: array</label>
            {type.map((item, index) => (
              <div className="pl-4" key={index}>
                {renderForm({ [index]: item }, newPath)}
              </div>
            ))}
          </div>
        );
      } else if (typeof type === "object") {
        return (
          <div key={newPath.join(".")} className="pl-4">
            <label className="block font-medium">{key}: object</label>
            <div className="pl-4">
              {renderForm(type, newPath)}
            </div>
          </div>
        );
      } else {
        const inputType = type === "number" ? "number" : type === "boolean" ? "checkbox" : "text";
        return (
          <div key={newPath.join(".")} className="mb-3">
            <label className="block text-sm font-medium mb-2">{key}</label>
            <input
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              type={inputType}
              onChange={handleChange(newPath)}
            />
          </div>
        );
      }
    });
  };

  const checkForEmptyFields = (node, path = []) => {
    let emptyFields = [];
  
    Object.keys(node).forEach((key) => {
      const newPath = [...path, key];
      const value = node[key];
  
      if (typeof value === "object" && value !== null) {
        emptyFields = emptyFields.concat(checkForEmptyFields(value, newPath));
      } else if (!value) {
        emptyFields.push(newPath.join('.'));
      }
    });
  
    return emptyFields;
  };
  
  
  const handleSave = () => {
    // console.log("Button clicked");
    const emptyFields = checkForEmptyFields(formState);
    console.log(emptyFields);
    if (emptyFields.length > 0) {
      setError(emptyFields);
      
    } else {
      setError([]);
      // Add save logic here
    }
  };
  

  return (
    <form className="p-10 bg-slate-600 w-1/3 mx-auto">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          type="text"
          value={formName}
          onChange={handleNameChange}
        />
      </div>
      {renderForm(formState)}
      <button 
        type="button"
        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
        onClick={handleSave}
      >
        Save
      </button>
      {error.length > 0 && (
        <div className="mt-3 text-red-500">
          Please fill out the following fields: {error.join(', ')}
        </div>
      )}
    </form>
  );
}
