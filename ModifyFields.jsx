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

    // forms 
    const [groupNameForm, setGroupNameForm] = useState(false);
    const [addgroupMemberForm, setAddGroupMemberForm] = useState(false);
    const [addAdminForm, setAddAdminForm] = useState(false);
    const [removeAdminForm, setRemoveAdminForm] = useState(false);
    const [removeMembersForm, setRemoveMembersForm] = useState(false);

    // form fields
    const [currentGroupName, setCurrentGroupName] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [groupMember, setGroupMember] = useState('');
    const [adminName, setAdminName] = useState('');
    
  
    const handleSubmit = async (event, type) => {
      event.preventDefault();
      console.log(type)
      const url = 'http://localhost:8000/' + type;    
      try {
          const response = await axios.post(url, {
            currentGroupName,
            groupMember,
            newGroupName,
            adminName,
          });
          // const response = await axios.post('http://localhost:8000/submit-form',{});
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      console.log('Request Sent!');
     

      };
  
    const handleSave = (props) => {
      // Add your logic to handle saving the new group name
      console.log('Current Group Name:', currentGroupName);
      console.log('New Group Name:', newGroupName);
    };
  
    const handleGroupnameClick = () => {
      setGroupNameForm(true);
      setAddGroupMemberForm(false);
      setAddAdminForm(false);
      setRemoveAdminForm(false);
      setRemoveMembersForm(false);
    };
  
    const handleAddGroupMembersClick = () => {
      setGroupNameForm(false);
      setAddGroupMemberForm(true);
      setAddAdminForm(false);
      setRemoveAdminForm(false);
      setRemoveMembersForm(false);
    };

    const handleAddAdminClick = () => {
      setGroupNameForm(false);
      setAddGroupMemberForm(false);
      setAddAdminForm(true);
      setRemoveAdminForm(false);
      setRemoveMembersForm(false);
    };

    const handleRemoveAdminClick = () => {
      setGroupNameForm(false);
      setAddGroupMemberForm(false);
      setAddAdminForm(false);
      setRemoveAdminForm(true);
      setRemoveMembersForm(false);
    }

    const handleRemoveMemebersClick = () => {
      setGroupNameForm(false);
      setAddGroupMemberForm(false);
      setAddAdminForm(false);
      setRemoveAdminForm(false);
      setRemoveMembersForm(true);
    }
  
    return (
      <>
        <DropdownButton id="groupname-dropdown" title="Modify" variant="primary">
          <Dropdown.Item onClick={handleAddAdminClick}>Add Admin</Dropdown.Item>
          <Dropdown.Item onClick={handleRemoveAdminClick}>Remove Admin</Dropdown.Item>
          <Dropdown.Item onClick={handleGroupnameClick}>Group Name</Dropdown.Item>
          <Dropdown.Item onClick={handleAddGroupMembersClick}>Add Group Members</Dropdown.Item>
          <Dropdown.Item onClick={handleRemoveMemebersClick}>Remove Group Members</Dropdown.Item>
        </DropdownButton>
        <div>dd</div>
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
            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e, "changeGroupName")}>
              Save
            </Button>
          </Form>
        )}
  
        {addgroupMemberForm && (
          <Form>
              <Form.Group controlId="currentGroupName">
              <Form.Label>Current Group Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="groupMember">
              <Form.Label>Group Members</Form.Label>
              <Form.Control
                type="text"
                value={groupMember} // Assuming this should display the current group name
                onChange={(e) => setGroupMember(e.target.value)}
              />
            </Form.Group>
            {/* Add more form elements for group members as needed */}
            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e, "addGroupMember")}>
              Save
            </Button>
          </Form>
        )}


        {addAdminForm && ( 
          <Form>
            <Form.Group controlId="currentGroupName">
              <Form.Label>Current Group Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="adminName">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e, "addGroupAdmin")}>
              Save
            </Button>
          </Form>
        )}

        {removeAdminForm && (
          <Form>
            <Form.Group controlId="currentGroupName">
              <Form.Label>Current Group Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="adminName">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e, "removeGroupAdmin")}>
              Save
            </Button>
          </Form>
        )}

        {removeMembersForm && (
            <Form>
            <Form.Group controlId="currentGroupName">
              <Form.Label>Current Group Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroupName}
                onChange={(e) => setCurrentGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="groupMember">
              <Form.Label>Group Members</Form.Label>
              <Form.Control
                type="text"
                value={groupMember} // Assuming this should display the current group name
                onChange={(e) => setGroupMember(e.target.value)}
              />
            </Form.Group>
            {/* Add more form elements for group members as needed */}
            <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e, "removeGroupMember")}>
              Save
            </Button>
            </Form>
            )}

      </>
    );
  }
  export default GroupNameDropdown;