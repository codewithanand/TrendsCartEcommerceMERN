import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthenticationContext';
import { Link, Navigate } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';

import "./login.scss"
import Alert from '../../components/alert/Alert';


const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { login } = useContext(AuthContext);

    const [alert, setAlert] = useState({
        message: '',
        type: ''
    });

    const [alertVisible, setAlertVisible] = useState(false);

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false);

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
            setAlert({ message: '', type: '' });
        }, 3000);
    };

    const validate = () => {
        const errors = {}

        if (!inputs.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = "Invalid email";
        }
        if (!inputs.password) {
            errors.password = "Password is required";
        } else if (inputs.password.length < 6) {
            errors.password = "Password must be atleast 6 characters"
        }

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSignin = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                await login(inputs);
                showAlert("Login successful!", "success");
                <Navigate to="/" />
            }
            catch (error) {
                showAlert(error.response?.data || "Server Error", "error");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='login'>
            <Alert
                message={alert.message}
                visible={alertVisible}
                onClose={() => setAlertVisible(false)}
                type={alert.type}
            />
            <div className='login-wrapper'>
                <h1>Login</h1>
                <form action="" className='signin-form'>
                    <div className="form-group">
                        <input type="email" name="email" placeholder='Email Address' onChange={handleChange} />
                        <span className='error-message'>{errors?.email}</span>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder='Password' onChange={handleChange} />
                        <span className='error-message'>{errors?.password}</span>
                    </div>
                    <button className='btn' onClick={handleSignin} disabled={loading}>{loading ? <LoopIcon className="spinner" /> : 'Sign in'}</button>
                </form>
                <Link className='link' to="/register">Don't have an account?</Link>
            </div>
        </div>
    )
}

export default Login