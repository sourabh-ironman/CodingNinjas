import React, { useEffect, useState } from 'react';
import './App.css';
import { ContactList } from './components/contactList';
import { ContactForm } from './components/contactForm';

function App() {
  const [contactList, setContactList] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    username: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [contactToShow, setContactToShow] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  //contact when the contact is created
  useEffect(()=>{
    if(formSubmitted){
      fetch("https://jsonplaceholder.typicode.com/users",{
        method: "Post",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(formData)
      })
      .then((response)=>{
        console.log('contact posted ', response);
      }) 
      .catch((err)=>{
        console.log('error in posting contact ',err);
      })

      setFormSubmitted(false);
    }
  },[formSubmitted])

  //called when the form is updated
  useEffect(()=>{
    if(formUpdated){
      fetch(`https://jsonplaceholder.typicode.com/users/${contactToShow.id}`,{
        method:'PUT',
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({...contactToShow, 
                              name:formData.name, 
                              email:formData.email, 
                              username: formData.username, 
                              website:formData.website, 
                              phone:formData.phone})
      })
      .then(()=>{
        console.log('data is updated ');
      })
      .catch((err)=>{
        console.log('error in updating data ',err);
      })

      setFormUpdated(false);
    }
  }, [formUpdated]);

  useEffect(()=>{
    if(deleteItem){
      fetch(`https://jsonplaceholder.typicode.com/users/${contactToShow.id}`,{
        method: 'Delete'
      })
      .then(()=>{
        console.log('deletion successful');
      })
      .catch((err)=>{
        console.log('error in deleting ',err);
      })
      setDeleteItem(false);
    }
  },[deleteItem])

  function handleSubmit(e){
    e.preventDefault();
    console.log('formData ',formData);
    setFormSubmitted(true);
    setContactList([...contactList, formData]);

    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',  
      username: ''
    });
    setShowAddContact(false);
  }

  function handleUpdate(e){
    e.preventDefault();
    console.log('data updated');  
    setFormUpdated(true);
    const updatedContacts = contactList.map((contact)=>{
      if(contact.id === contactToShow.id){
        contact.name = formData.name;
        contact.email = formData.email;
        contact.website = formData.website;
        contact.username = formData.username;
        contact.phone = formData.phone;
      }
      return contact;
    });

    setContactList(updatedContacts);
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',  
      username: ''
    });
    setShowEditForm(false);
  }

  function handleDelete(e){
    e.preventDefault();
    const index = contactList.findIndex((contact, i)=>{
      return contact.id === contactToShow.id;
    })

    contactList.splice(index, 1);
    setContactList([...contactList]);
    setContactToShow('')
  }

  
  return (
    <div className="App">
      <div className="header">
        <h1>CONTACTS LIST</h1>
        <button onClick={()=>setShowAddContact(!showAddContact)}>
          {!showAddContact?"Add Contact":"Cancel"}
          </button>
      </div>
      {
        showAddContact && <ContactForm formData={formData} 
                                      setFormData={setFormData} 
                                      handleSubmit={handleSubmit}
                                       />
      }
      <ContactList contactList={contactList} 
                  setContactList={setContactList} 
                  formData={formData} 
                  setFormData={setFormData} 
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                  contactToShow={contactToShow}
                  setContactToShow={setContactToShow}
                  showEditForm={showEditForm}
                  setShowEditForm={setShowEditForm}
                  handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
