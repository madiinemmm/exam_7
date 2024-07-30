import React from "react";

function FormInput({ name, labelText, type, status }) {
  return (
    <div>
      <label className="form-control">
        <div className="label">
          <span className="capitalize mt-2 pl-11 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            {labelText}
          </span>
        </div>
        <input
          type={type}
          name={name}
          placeholder="Type here"
          className={`px-3 py-2 input-${status} bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-80 ml-auto mr-auto rounded-md sm:text-sm focus:ring-1`}
        />
      </label>
    </div>
  );
}

export default FormInput;
