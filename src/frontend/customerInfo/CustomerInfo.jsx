import React from 'react';
import './CustomerInfo.scss';
import { useState, useEffect } from 'react';

export default function CustomerInfo() {

  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  }

  useEffect(() => {
    console.log(info);
  }, [info]);

  const handleSubmit = async (e) => { 
    try {
      e.preventDefault()
      const port = import.meta.env.VITE_BACKEND_PORT || 3000;
      console.log(port)
      const backendUrl = `http://localhost:${port}/users`;
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      })

      if (response.ok) {
        alert('User data saved successfully!');
      } else {
        alert('Failed to save user data');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="customer-info">
      <h1>Thank you for choosing FortyWinks! </h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" name="name" value={info.name} placeholder="Name" onChange={handleChange} required />
        <input type="text" name="email" value={info.email} placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" value={info.phone} placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="address" value={info.address} placeholder="Address" onChange={handleChange} required />
        <input type="text" name="suburb" value={info.suburb} placeholder="Suburb" onChange={handleChange} required />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </section>
  );
}
