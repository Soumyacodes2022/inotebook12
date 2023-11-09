import React , { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({Email:"", Password:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5500/api/auth/login`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({Email:credentials.Email, Password: credentials.Password}),
    });
    const json = await response.json();
    console.log(json);

}
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Email" className="form-label">
          Email address
        </label>
        <input
          type="Email"
          className="form-control"
          id="Email"
          name="Email"
          aria-describedby="emailHelp"
          value={credentials.Email}
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your Email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">
          Password
        </label>
        <input
          type="Password"
          className="form-control"
          id="Password"
          name="Password"
          value={credentials.Password}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-dark">
        Login
      </button>
    </form>
  );
};

export default Login;
