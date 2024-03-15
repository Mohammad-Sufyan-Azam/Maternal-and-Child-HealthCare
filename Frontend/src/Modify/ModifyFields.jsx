// import React, { useState } from 'react';
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
  
  
  
  // import Dropdown from 'react-bootstrap/Dropdown';
  // import DropdownButton from 'react-bootstrap/DropdownButton';
  
  // function Icons() {
  //   return (
  //     <DropdownButton id="dropdown-basic-button" title="Dropdown button">
  //       <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  //       <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  //     </DropdownButton>
  //   );
  // }
  
  import React, { useState } from 'react';
  import Dropdown from 'react-bootstrap/Dropdown';
  import DropdownButton from 'react-bootstrap/DropdownButton';
  import Form from 'react-bootstrap/Form';
  import axios from 'axios';
  
  // import Button from 'react-bootstrap/Button';
  
  // function GroupNameDropdown() {
  //   const [GroupNameForm, setShowGroupNameForm] = useState(false);
  //   const [GroupMemberForm, setGroupMemberForm] = useState(false);
  //   const [currentGroupName, setCurrentGroupName] = useState('');
  //   const [newGroupName, setNewGroupName] = useState('');
  
  //   const handleSave = () => {
  //     // Add your logic to handle saving the new group name
  //     console.log('Current Group Name:', currentGroupName);
  //     console.log('New Group Name:', newGroupName);
  //     setShowForm(false);
  //   };
  
  //   return (
  //     <>
  //       <DropdownButton id="groupname-dropdown" title="Modify" variant="primary">
  //         <Dropdown.Item onClick={() => setShowGroupNameForm(true)}>Group Name</Dropdown.Item>
  //         <Dropdown.Item onClick={() => setGroupMemberForm(true)}>Group Members</Dropdown.Item>
  //       </DropdownButton>
  
  //       {GroupNameForm && (
  //         <Form>
  //           <Form.Group controlId="currentGroupName">
  //             <Form.Label>Current Group Name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               value={currentGroupName}
  //               onChange={(e) => setCurrentGroupName(e.target.value)}
  //             />
  //           </Form.Group>
  //           <Form.Group controlId="newGroupName">
  //             <Form.Label>New Group Name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               value={newGroupName}
  //               onChange={(e) => setNewGroupName(e.target.value)}
  //             />
  //           </Form.Group>
  //           <Button variant="primary" onClick={handleSave}>
  //             Save
  //           </Button>
  //         </Form>
  //       )}
  
  //       {GroupMemberForm && (
  //         <Form>
  //           <Form.Group controlId="currentGroupName">
  //             <Form.Label>Current Group Name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               value={currentGroupName}
  //               onChange={(e) => setCurrentGroupName(e.target.value)}
  //             />
  //           </Form.Group>
  //           <Form.Group controlId="newGroupName">
  //             <Form.Label>New Group Name</Form.Label>
  //             <Form.Control
  //               type="text"
  //               value={newGroupName}
  //               onChange={(e) => setNewGroupName(e.target.value)}
  //             />
  //           </Form.Group>
  //           <Button variant="primary" onClick={handleSave}>
  //             Save
  //           </Button>
  //         </Form>
  //       )}
      
  
  //     </>
  //   );
  // }
  function GroupNameDropdown() {
    const [groupNameForm, setGroupNameForm] = useState(false);
    const [groupMemberForm, setGroupMemberForm] = useState(false);
    const [currentGroupName, setCurrentGroupName] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
          const response = await axios.post('http://localhost:8000/submit-form', {
            currentGroupName,
            newGroupName
          });
          // const response = await axios.post('http://localhost:8000/submit-form',{});
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
    const handleSave = () => {
      // Add your logic to handle saving the new group name
      console.log('Current Group Name:', currentGroupName);
      console.log('New Group Name:', newGroupName);
    };
  
    const handleGroupnameClick = () => {
      setGroupNameForm(true);
      setGroupMemberForm(false);
    };
  
    const handleGroupMembersClick = () => {
      setGroupNameForm(false);
      setGroupMemberForm(true);
    };
  
    return (
      <>
        <DropdownButton id="groupname-dropdown" title="Modify" variant="primary">
          <Dropdown.Item onClick={handleGroupnameClick}>Group Name</Dropdown.Item>
          <Dropdown.Item onClick={handleGroupMembersClick}>Group Members</Dropdown.Item>
        </DropdownButton>
  
        {groupNameForm && (
          <Form  onSubmit={handleSubmit}>
            <Form.Group controlId="currentGroupName">
              <Form.Label>Current Group Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newGroupName">
              <Form.Label>New Group Name</Form.Label>
              <Form.Control
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
          </Form>
        )}
  
        {groupMemberForm && (
          <Form>
              <Form.Group controlId="currentGroupName">
              <Form.Label>Current Group Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="groupMembers">
              <Form.Label>Group Members</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName} // Assuming this should display the current group name
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            {/* Add more form elements for group members as needed */}
            <Button variant="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
          </Form>
        )}
      </>
    );
  }
  export default GroupNameDropdown;