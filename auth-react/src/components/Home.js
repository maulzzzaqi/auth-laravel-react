import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Home() {
    const [user, setUser] = useState({});
    const history = useHistory();
    const token = localStorage.getItem('token');

    const fetchDataHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get('http://localhost:8000/api/user').then((response) => {
            setUser(response.data);
        });
    };

    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
        fetchDataHandler();
    }, [token, history]);

    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post('http://localhost:8000/api/logout').then(() => {
            localStorage.removeItem('token');
            history.push('/login');
        });
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-lg text-center">
                        <div className="card-body p-4">
                            <h3 className="fw-bold">Welcome, {user.name}!</h3>
                            <button onClick={logoutHandler} className="btn btn-danger btn-lg mt-2">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
