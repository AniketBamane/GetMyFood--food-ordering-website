import React from 'react';

const ReviewCard = ({ review, name }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white h-[20vh] flex flex-col justify-between">
    <p className="text-gray-700">{review}</p>
    <p className="mt-2 font-semibold text-gray-900">- {name}</p>
  </div>
);

export default ReviewCard;
