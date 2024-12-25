import React, { useEffect, useState } from 'react'
import axios from "axios"

const Employee_List = () => {
    const [input_formData , setinput_formData ] = useState({
     firstName:"",
      lastName:"",
      email:"",
      phone:"",
      location:"",
      salary:""
    })

 const [  employees , setEmployees ] = useState([])
 const [ editId , seteditId ] = useState(null)
   // Input Change Event
    function handleChange(e)
  {
    const { name , value } = e.target
    if(value !="")
    {  
       setinput_formData((prev)=>({...prev,[name]:value}))
    }
    
  }

  // Fetch Detail 
  const fetechEmployees = async ()=>{
      try {
        const res = await axios.get("http://localhost:4000/api/employee/");
        setEmployees(res.data)
      } catch (error) {
         console.error('Error fetching employees')
         setEmployees([])
      }
  }

  // Add or Update Employees
  const handleSubmit = async (e) =>{ 
      e.preventDefault()
      try {
         if (editId) {
           const res = await axios.put(`http://localhost:4000/api/employee/${editId}`,input_formData);
           setEmployees((prev)=>
              prev.map((employee)=>
              employee._id == editId ? res.data : employee)
           )
           seteditId(null)
          } else {
           const res = await axios.post("http://localhost:4000/api/employee/",input_formData)
           setEmployees((prev)=>[...prev,res.data])
         }

          setinput_formData({
             firstName:"",
            lastName:"",
            email:"",
            phone:"",
            location:"",
            salary:""
          })
      } catch (error) {
          console.error('Error in Add or Update Employee')
      }
  }

 const handleEdit = (id)=>{
     const employee = employees.find((emp)=>emp._id=== id)
     if(employee)
     {
       setinput_formData(employee)
       seteditId(id)
     }
 }

 const handleDel = async(id)=>{
    try {
        await axios.delete(`http://localhost:4000/api/employee/${id}`);
       setEmployees((prev)=>prev.filter((emp)=>emp._id !== id))
      } catch (error) {
        console.error('Error Deleting employee')
    }
 }

 useEffect(()=>{
   fetechEmployees()
 },[])

  return (
    <>
      <section className="input">
        <div className="container">
          <h3 className="add_employee">Add a new Empolyee</h3>
          <div className="input-wrapper">
            <ul>
              <li>
                <div>
                  <input
                    name="firstName"
                    type="text"
                    value={input_formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <input
                    name="lastName"
                    type="text"
                    value={input_formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </li>
              <li>
                <input
                  name="email"
                  type="email"
                  value={input_formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </li>
              <li>
                <input
                  name="phone"
                  type="number"
                  value={input_formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                />
              </li>
              <li>
                <input
                  name="location"
                  type="text"
                  value={input_formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </li>
              <li>
                <input
                  name="salary"
                  type="number"
                  value={input_formData.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  required
                />
              </li>
              <li>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="employee">
        <div className="container">
          <div className="employee-wrapper">
            <div className="employee-title">
              <ul>
                <li>ID</li>
                <li>First</li>
                <li>Last</li>
                <li>Email</li>
                <li>Phone</li>
                <li>Location</li>
                <li>Salary</li>
                <li>Actions</li>
              </ul>
            </div>
            <div className="employee-list">
              {employees.length > 0 ? (
                employees.map((employ, index) => (
                  <div key={employ._id} className={employ._id}>
                    <ul>
                      <li>{index + 1}</li>
                      <li>{employ.firstName}</li>
                      <li>{employ.lastName}</li>
                      <li>{employ.email}</li>
                      <li>{employ.phone}</li>
                      <li>{employ.location}</li>
                      <li>{employ.salary}</li>
                      <li>
                        <button
                          onClick={() => {
                            handleEdit(employ._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDel(employ._id)
                          }}
                        >
                          Del
                        </button>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No Employees Found</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Employee_List
