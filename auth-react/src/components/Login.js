import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/home');
        }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        await axios.post('http://localhost:8000/api/login', formData).then((response) => {
            localStorage.setItem('token', response.data.token);
            history.push('/home');
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
                            <h4 className="fw-bold text-center">Login</h4>
                            <hr/>
                            {validation.message && (
                                <div className="alert alert-danger">
                                    {validation.message}
                                </div>
                            )}
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">Enter Your Username</label>
                                    <input type="text" className={`form-control ${validation.username ? 'is-invalid' : ''}`} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                                    {validation.username && (
                                        <div className="invalid-feedback">
                                            {validation.username[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Your Password</label>
                                    <input type="password" className={`form-control ${validation.password ? 'is-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                    {validation.password && (
                                        <div className="invalid-feedback">
                                            {validation.password[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                </div>
                            </form>
                            <p className="text-center">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
