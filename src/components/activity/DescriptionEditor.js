import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function DescriptionEditor(){
  const [description, setDescription] = useState('');

  const handleChange = (value) => {
    setDescription(value);
  };

  return (
    <div>
      <ReactQuill value={description} onChange={handleChange} />
    </div>
  );
};

export default DescriptionEditor;


