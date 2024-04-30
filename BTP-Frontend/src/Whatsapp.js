import React, { useState, useEffect  } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import backgroundImage from './assets/WABg.jpeg'; 
import axios from 'axios';

const WhatsApp = () => {
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
  const handleSubmitFile = () => {
    if (!selectedFile) {
      alert('No file selected. Please upload a file first!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    fetch('http://localhost:8000/uploadWhatsappfile', {
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
        <h1>WhatsApp Messages</h1>
        <p>Upload and submit files for processing.</p>
        <input 
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }} onClick={handleUploadClick}>Upload</button>
        <button style={{ backgroundColor: 'grey', color: 'white' }} onClick={handleSubmitFile}>Submit</button>
        {selectedFile && <p>File ready to submit: {selectedFile.name}</p>}

        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}> 
          <h3 style={{ marginTop: '20px' }}>Or</h3> 
        </div>
        {/* <h1>{groupSelected}</h1>
        <h1>{optionSelected}</h1> */}
        <h2>Manually Make Changes</h2>
        <div  style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
           
            {/* Map over the list of strings and render a button for each string */}
            {groupNames.map((string, index) => (
                <button
                    key={index}
                    style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                    onClick={() => {setGroupSelected(string);setOptionSelected(string)}}
                >
                    {string}
                </button>
            ))}
        </div>
        
        {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setOptionSelected('group1')}>Group 1</button>
          <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setOptionSelected('group2')}>Group 2</button>
        </div> */}
        
        {optionSelected && (
          <>
            <div onChange={handleOptionChange} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="ChangeMobileNumber" value="ChangeMobileNumber" name="option" />
                <span style={{ marginLeft: '10px' }}>Change Mobile Number</span>
              </label>
              <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="AddAltMobileNumber" value="AddAltMobileNumber" name="option" />
                <span style={{ marginLeft: '10px' }}>Add Mobile Number</span>
              </label>
              <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="AddMember" value="AddMember" name="option" />
                <span style={{ marginLeft: '10px' }}>Add Member to Group</span>
              </label>
              <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="RemoveMember" value="RemoveMember" name="option" />
                <span style={{ marginLeft: '10px' }}>Remove Member from a Group</span>
              </label>
            </div>

            {optionSelected && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                <input 
                  type="text"
                  name="userId"
                  placeholder="User id"
                  value={userData.userId}
                  onChange={handleInputChange}
                  style={{ width: '200px' }} 
                />
                <input 
                  type="text"
                  name="userName"
                  placeholder="User's name"
                  value={userData.userName}
                  onChange={handleInputChange}
                  style={{ width: '200px' }} 
                />
                {optionSelected !== 'AddAltMobileNumber' && (
                  <input 
                    type="tel"
                    name="mobileNumber"
                    placeholder="User's Mobile Number"
                    value={userData.mobileNumber}
                    onChange={handleInputChange}
                    style={{ width: '200px' }} 
                  />
                )}
                {optionSelected === 'AddAltMobileNumber' && (
                  <input 
                    type="tel"
                    name="altMobileNumber"
                    placeholder="User's Alternative Mobile Number"
                    value={userData.altMobileNumber}
                    onChange={handleInputChange}
                    style={{ width: '200px' }} 
                  />
                )}
                <button style={{ backgroundColor: 'green', color: 'white' }} onClick={handleSubmitChanges}>Make Changes</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WhatsApp;