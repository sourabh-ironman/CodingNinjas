import { useState } from "react";
import styles from "../styles/contactDetails.module.css";

import { ContactForm } from "./contactForm";

export function ContactDetails({contactToShow, formData, setFormData, handleSubmit, handleUpdate,handleDelete, showEditForm, setShowEditForm}){
    

    function handleEditClick(){
        setShowEditForm(!showEditForm);
    }

    return (
        <div className={styles.contactDetails}>  
            <>
                <div className={styles.contactDetailsHeader}>
                    <h1>{contactToShow.name}</h1>
                    <div>
                        <button onClick={()=>handleEditClick()}>
                            {!showEditForm?"Edit":"Cancel"}
                        </button>
                        {!showEditForm && <button onClick={(e)=>handleDelete(e)}>Delete</button>}
                        
                    </div>
                </div>

                {
                    !showEditForm?<>
                    <p><strong>email:</strong> {contactToShow.email}</p>
                    <p><strong>username:</strong> {contactToShow.username}</p>
                    <p><strong>phone:</strong> {contactToShow.phone}</p>
                    <p><strong>website:</strong> {contactToShow.website}</p>
                    </>:<ContactForm contactToShow={contactToShow}
                                     showEditForm={showEditForm} 
                                     formData={formData} 
                                     setFormData={setFormData} 
                                     handleSubmit={handleSubmit}
                                     handleUpdate={handleUpdate}/>
                }
            </>
            
        </div>
    )
}