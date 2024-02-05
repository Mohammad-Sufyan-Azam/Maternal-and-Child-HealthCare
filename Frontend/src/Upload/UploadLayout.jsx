import React from 'react';
import Sidebar from './SideBar'; // You may need to create Sidebar component separately
// import useState
import { useState } from 'react';
import './uploadLayout.css';
import {TextField} from '@adobe/react-spectrum'


const UploadLayout = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    // Set the selected file when the user chooses a file
    console.log('File selected:', event.target.files[0].name);
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

  const handleFileUpload = async (event) => {
    const file = selectedFile;

    // Create a FormData object to send the file to the server
    const formData = new FormData();
    formData.append('file', file);
    console.log('File to upload:', typeof(file));
    try {
      // Send the file to the FastAPI backend
      const response = await fetch('http://localhost:8000/uploadfile', {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      // Assuming the backend returns a JSON object with the file details
      const result = await response.json();
      setUploadedFile(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (<>
      {/* Input for file upload */}
      <Sidebar/>
      <div className='uploadSection'>
      <h1 className='uploadHeading1'>Upload Whatsapp Chat Data</h1>
      <div>
      <input type="file" id="actual-btn" onChange={handleFileChange} hidden/>
      <label for="actual-btn">Choose File</label>
      {!selectedFile ? 
      <TextField defaultValue='No file chosen' type='text' UNSAFE_className='textLabel'/> :
      <TextField value={selectedFile.name} type='text' UNSAFE_className='textLabel'/>}
      </div>
      <button className='submitButton' onClick={handleFileUpload}>Submit</button>
      </div>
      <div className='uploadSection'>
      <h1 className='uploadHeading2'>Upload Whatsapp Chat Data</h1>
      <div>
      <input type="file" id="actual-btn" onChange={handleFileChange} hidden/>
      <label for="actual-btn">Choose File</label>
      {!selectedFile ? 
      <TextField defaultValue='No file chosen' type='text' UNSAFE_className='textLabel'/> :
      <TextField value={selectedFile.name} type='text' UNSAFE_className='textLabel'/>}
      </div>
      <button className='submitButton' onClick={handleFileUpload}>Submit</button>
      </div>
      <div className='uploadSection'>
      <h1 className='uploadHeading2'>Upload Whatsapp Chat Data</h1>
      <div>
      <input type="file" id="actual-btn" onChange={handleFileChange} hidden/>
      <label for="actual-btn">Choose File</label>
      {!selectedFile ? 
      <TextField defaultValue='No file chosen' type='text' UNSAFE_className='textLabel'/> :
      <TextField value={selectedFile.name} type='text' UNSAFE_className='textLabel'/>}
      </div>
      <button className='submitButton' onClick={handleFileUpload}>Submit</button>
      </div> 
      <div className='uploadSection'>
      <h1 className='uploadHeading2'>Upload Whatsapp Chat Data</h1>
      <div>
      <input type="file" id="actual-btn" onChange={handleFileChange} hidden/>
      <label for="actual-btn">Choose File</label>
      {!selectedFile ? 
      <TextField defaultValue='No file chosen' type='text' UNSAFE_className='textLabel'/> :
      <TextField value={selectedFile.name} type='text' UNSAFE_className='textLabel'/>}
      </div>
      <button className='submitButton' onClick={handleFileUpload}>Submit</button>
      </div> 
      </>
  );
};
  
  export default UploadLayout;