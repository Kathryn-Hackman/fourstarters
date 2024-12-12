// Square.jsx
import React, { useState } from 'react';
import { CompletedDot } from './CompletedDot';
import { NotStartedDot } from './NotStartedDot';
import { InProgressDot } from './InProgressDot';

const Square = () => {
  return (
    <>
    <div className="grid grid-cols-2 gap-32">
        <CompletedDot></CompletedDot>
        <InProgressDot></InProgressDot>
        <NotStartedDot></NotStartedDot>
        <NotStartedDot></NotStartedDot>
    </div>
    </>
  );
};

export default Square;