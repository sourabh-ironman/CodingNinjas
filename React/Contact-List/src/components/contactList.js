import { useEffect, useState } from "react";
import styles from "../styles/contactList.module.css";
import { ContactDetails } from "./contactDetails";


export function ContactList({contactList, setContactList, formData, setFormData, handleSubmit,handleUpdate, contactToShow, setContactToShow, showEditForm, setShowEditForm, handleDelete}){

    // const [contactList, setContactList] = useState([]);
    

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
           return response.json()
        })
        .then((data)=>{
            console.log('data ',data);
            setContactList(data);
        })
    },[]);

    return(
        <div className={styles.contactsContainer}>
            <div className={styles.contactlist}>
                <ul>
                    {
                        contactList.map((contact, i)=>{
                            return <li key={i} onClick={()=>{
                                    console.log('clicked a name')
                                    setContactToShow(contact)
                                }}>
                                {contact.name}
                            </li>
                        })
                    }
                </ul>
            </div>

            <div className={styles.contactDetails}>
                {
                    contactToShow && <ContactDetails contactToShow={contactToShow} 
                                                    formData={formData} 
                                                    setFormData={setFormData} 
                                                    handleSubmit={handleSubmit}
                                                    handleUpdate={handleUpdate}
                                                    showEditForm={showEditForm}
                                                    setShowEditForm={setShowEditForm}
                                                    handleDelete={handleDelete}/>
                }
            </div>

        </div>
    )
}