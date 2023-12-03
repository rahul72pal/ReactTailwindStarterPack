// PersonalDetailItem.jsx
import React from 'react';

const PersonalDetailItem = ({ label, value }) => {
  return (
    <div className="flex items-center text-center w-full mx-auto ">

      <p className="w-full mx-auto font-semibold text-center">{label}:</p>
      <p className="w-full text-yellow-50 mx-auto">{value}</p>

    </div>
  );
};

export default PersonalDetailItem;
