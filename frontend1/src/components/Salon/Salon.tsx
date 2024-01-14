import React from "react";
import { useParams } from "react-router-dom";

const Salon: React.FC = () => {
  const { id } = useParams();

  // Use the 'id' parameter in your component logic

  return (
    <div>
      Salon Details for ID: {id}
      {/* Add your component logic here */}
    </div>
  );
};

export default Salon;
