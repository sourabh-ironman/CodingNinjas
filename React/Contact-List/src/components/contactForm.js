import { useEffect } from "react";


export function ContactForm({handleSubmit, handleUpdate, formData, setFormData, showEditForm, contactToShow}){

  useEffect(()=>{
    if(showEditForm){
      setFormData({
        name: contactToShow.name,
        email: contactToShow.email,
        phone: contactToShow.phone,
        username: contactToShow.username,
        website: contactToShow.website
      })
  }
  else{
    setFormData({
      name: '',
      email: '',
      phone: '',
      username: '',
      website: ''
    })
  }

  },[showEditForm])

  

    return(
        <div className='addContactForm'>
          <form onSubmit={!showEditForm?(e)=>handleSubmit(e):(e)=>handleUpdate(e)}>
            Name:  <input type='text' name='name' value={formData.name} placeholder='name'  
            onChange={
              (e)=>setFormData({
                name:e.target.value,
                email:formData.email,
                phone: formData.phone,
                username: formData.username,
                website: formData.website
                })} required/><br/>
            
            Email:  <input type='email' name='email' value={formData.email} placeholder='email'  
            onChange={
              (e)=>setFormData({
                name: formData.name,                
                email:e.target.value,
                phone: formData.phone,
                username: formData.username,
                website: formData.website
                })} required/><br/>
            
            Phone:  <input type='phone' name='phone' value={formData.phone} placeholder='phone'  
            onChange={
              (e)=>setFormData({
                name: formData.name,
                email:formData.email,
                phone:e.target.value,
                username: formData.username,
                website: formData.website
                })} /><br/>
            
            Website:  <input type='text' name='website' value={formData.website} placeholder='website'  
            onChange={
              (e)=>setFormData({
                name: formData.name,
                email:formData.email,
                phone: formData.phone,
                username: formData.username,
                website:e.target.value
                })} /><br/>
            
            Username:  <input type='text' name='username' value={formData.username} placeholder='username'  
            onChange={
              (e)=>setFormData({
                name: formData.name,
                email:formData.email,
                phone: formData.phone,
                username:e.target.value,
                website: formData.website
                })} /><br/>
            
            <button type='submit'>{!showEditForm?"Submit":"Update"}</button>
          </form>
        </div>
    )
}