import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoopIcon from '@mui/icons-material/Loop';


import './register.scss';
import Alert from '../../components/alert/Alert';

const Register = () => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

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

        if (!inputs.name) {
            errors.name = "Name is required";
        }
        if (!inputs.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = "Invalid email";
        }
        if (!inputs.password) {
            errors.password = "Password is required";
        } else if (inputs.password.length < 6) {
            errors.password = "Password must be atleast 6 characters"
        } else if (inputs.password !== inputs.password_confirmation) {
            errors.password = "Confirmaton password does not match";
        }
        if (!inputs.password_confirmation) {
            errors.password_confirmation = "Confirm password is required";
        }

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                const { password_confirmation, ...user } = inputs;
                await axios.post("http://localhost:8800/api/auth/register", user);
                showAlert("Registration successful!", "success");
            }
            catch (error) {
                showAlert(error.response?.data || "Server Error", "error");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='register'>
            <Alert
                message={alert.message}
                visible={alertVisible}
                onClose={() => setAlertVisible(false)}
                type={alert.type}
            />
            <div className='register-wrapper'>
                <h1>Register</h1>
                <form action="" className='signup-form'>
                    <div className="form-group">
                        <input type="text" name="name" placeholder='Full Name' onChange={handleChange} />
                        <span className='error-message'>{errors?.name}</span>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder='Email Address' onChange={handleChange} />
                        <span className='error-message'>{errors?.email}</span>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder='Password' onChange={handleChange} />
                        <span className='error-message'>{errors?.password}</span>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password_confirmation" placeholder='Confirm Password' onChange={handleChange} />
                        <span className='error-message'>{errors?.password_confirmation}</span>
                    </div>
                    <button className='btn' onClick={handleSignup} disabled={loading}>{loading ? <LoopIcon className="spinner" /> : 'Sign Up'}</button>
                </form>
                <Link className='link' to="/login">Already an account?</Link>
            </div>
        </div>
    )
}

export default Register