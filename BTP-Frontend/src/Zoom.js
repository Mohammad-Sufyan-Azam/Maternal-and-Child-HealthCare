import React, { useState, useEffect  } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import backgroundImage from './assets/WABg.jpeg'; 
import axios from 'axios';

const Zoom = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);
  const [groupSelected, setGroupSelected] = useState(null);

  const [userData, setUserData] = useState({
    userId: '',
    userName: '',
    mobileNumber: '',
    altMobileNumber: '',
    group_name: ''
  });

  
  // MODIFIED
  const baseURL = 'http://localhost:8000/' ;
  const [groupNames, setGroupNames] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(baseURL + 'getGroupNames'); 
            const data = await response.json();
            setGroupNames(data);
        } catch (error) {
            console.error('Error:', error);
        }
      };
      fetchData();
      }, []);

  

  // Opens file input dialog to choose a file
  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  // Sets the chosen file to state
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      alert(`File ${file.name} is ready to submit.`);
    }
  };

  // Submits the file to the server
  const handleSubmitFile = async(event,type) => {
    if (!selectedFile) {
      alert('No file selected. Please upload a file first!');
      return;
    }
    console.log(type);
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    fetch('http://localhost:8000/' + type, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // If you are sure the server always sends JSON
      } else {
        // If the server might send a non-JSON response:
        return response.text().then(text => {
          throw new Error(text || 'Server responded with a non-200 status code');
        });
      }
    })
    .then(data => {
      alert('File processed successfully!');
      console.log(data);
      setSelectedFile(null); // Clear the selected file after submission
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to upload the file: ' + error.message);
    });
  };
  // Handles changes in option radio buttons
  const handleOptionChange = (event) => {
    setOptionSelected(event.target.value);
    setUserData({
      userId: '',
      userName: '',
      mobileNumber: '',
      altMobileNumber: '',
      group_name: groupSelected 
    });
  };

  // Handles changes in user data form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handles the submission of user data changes
  const handleSubmitChanges = async () => {
    alert(`Changes ready for submission: ${JSON.stringify(userData)}`);
    let url = baseURL;
    if (optionSelected === 'AddMember') {url += 'addGroupMember';}
    if (optionSelected === 'RemoveMember') {url += 'removeGroupMember';}
    if (optionSelected === 'ChangeMobileNumber') {url += 'changeMobileNumber';}
    if (optionSelected === 'AddAltMobileNumber') {url += 'addMobileNumber';}

    try {
      const response = await axios.post(url, userData);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }



    setUserData({
      
      userId: '',
      userName: '',
      mobileNumber: '',
      altMobileNumber: '',
      group_name: groupSelected
    });
    setOptionSelected(null);
    setGroupSelected(null);
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Navbar />
      <Sidebar />
      <div style={{ margin: '20px' }}>

        <h1>Zoom Uploads</h1>
        <p>Upload and submit files for processing.</p>


        <input 
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }} onClick={handleUploadClick}>Upload Transcripts (VTT)</button>
        <button style={{ backgroundColor: 'grey', color: 'white' }} onClick={(e) => handleSubmitFile(e, "uploadZoomTranscript/")}>Submit</button>
        {selectedFile && <p>File ready to submit: {selectedFile.name}</p>}
        <p></p>
        <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }} onClick={handleUploadClick}>Upload Chats </button>
        <button style={{ backgroundColor: 'grey', color: 'white' }} onClick={(e) => handleSubmitFile(e, "uploadZoomChats/")}>Submit</button>
        {selectedFile && <p>File ready to submit: {selectedFile.name}</p>}
        <p></p>
        {/* <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }} onClick={handleUploadClick}>Upload Attendance </button>
        <button style={{ backgroundColor: 'grey', color: 'white' }} onClick={(e) => handleSubmitFile(e, "uploadZoomAttendance/")}>Submit</button>
        {selectedFile && <p>File ready to submit: {selectedFile.name}</p>}
        <p></p>
        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}> 
        </div> */}

        

      </div>
    </div>
  );
};

export default Zoom;