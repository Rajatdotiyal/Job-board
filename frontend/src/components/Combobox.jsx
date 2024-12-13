import React, { useState } from 'react';

const RoleComboBox = () => {
  const [selectedRole, setSelectedRole] = useState("Please Select");

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="role-combobox">
      <h2>Role</h2>
      <select value={selectedRole} onChange={handleChange}>
        <option value="Please Select" disabled>
          Please Select
        </option>
        <option value="Jobseeker">Jobseeker</option>
        <option value="Employer">Employer</option>
      </select>
      <p>Selected Role: {selectedRole}</p>
    </div>
  );
};

export default RoleComboBox;
