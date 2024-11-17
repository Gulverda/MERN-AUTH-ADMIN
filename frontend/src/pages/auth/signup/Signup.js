import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Signup = () => {
    const navigate = useNavigate();
    const[formsData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formsData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formsData)
        try {
            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formsData)
            })
            const data = await response.json()
            console.log(data)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div>
      <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={formsData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={formsData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formsData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup
