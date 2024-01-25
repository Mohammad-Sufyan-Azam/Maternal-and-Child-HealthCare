import React from 'react';
import Sidebar from './SideBar'; // You may need to create Sidebar component separately
// import useState
import { useState } from 'react';
import './uploadLayout.css';

const UploadLayout = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Set the selected file when the user chooses a file
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Implement your logic to handle the submitted file
    if (selectedFile) {
      console.log('File submitted:', selectedFile);
      // You may want to send the file to a server or perform other actions here
    } else {
      console.log('No file selected');
    }
  };

  return (<>
      {/* Input for file upload */}
      <Sidebar/>
      <div className='uploadSection'>
      <input type="file" onChange={handleFileChange} />

      {/* Submit button */}
      <button className='submitButton' onClick={handleSubmit}>Submit</button>
      </div>
      
      </>
  );
};
  
  export default UploadLayout;