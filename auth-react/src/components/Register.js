import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState([]);
    const history = useHistory();

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('username', username);
        formData.append('password', password);

        await axios.post('http://localhost:8000/api/register', formData).then(() => {
            history.push('/login');
        }).catch((error) => {
            setValidation(error.response.data);
        });
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 rounded shadow-lg">
                        <div className="card-body p-4">
                            <h4 className="fw-bold text-center">Register</h4>
                            <hr />
                            <form onSubmit={registerHandler}>
                                <div className="mb-3">
                                    <label className="form-label">Your Name</label>
                                    <input type="text" className={`form-control ${validation.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                    {validation.name && (
                                        <div className="invalid-feedback">
                                            {validation.name[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Your Username</label>
                                    <input type="text" className={`form-control ${validation.username ? 'is-invalid' : ''}`} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                    {validation.username && (
                                        <div className="invalid-feedback">
                                            {validation.username[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Your Password</label>
                                    <input type="password" className={`form-control ${validation.password ? 'is-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                    {validation.password && (
                                        <div className="invalid-feedback">
                                            {validation.password[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                </div>
                                <p className="text-center mt-2">
                                Already have an account? <Link to="/login">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
