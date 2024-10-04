import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
// import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext'; // Assuming you have this context set up

// Define the shape of form data and form errors
interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { login } = useAuth(); // Use your authentication context
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'email') {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                email: value
                    ? validateEmail(value)
                        ? ''
                        : 'Invalid Email'
                    : 'Email is required',
            }));
        } else if (name === 'password') {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                password: value
                    ? validatePassword(value)
                        ? ''
                        : 'Invalid Password'
                    : 'Password is required',
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const emailError = validateEmail(formData.email) ? '' : 'Invalid email format';
        const passwordError = validatePassword(formData.password) ? '' : 'Invalid Password';

        setFormErrors({
            email: emailError,
            password: passwordError,
        });

        if (emailError || passwordError) {
            setIsLoading(false);
            return;
        }

        // Simulating a login process
        if (formData.email === 'admin@gmail.com' && formData.password === 'Admin@123') {
            login(); // Assuming login sets the authenticated state
            notification.success({
                message: 'Login Successful!',
                description: 'Welcome back to the platform.',
                placement: 'top',
                duration: 0.5,
            });

            setTimeout(() => {
                navigate('/'); // Redirect to home or any other page
            }, 2000);
        } else {
            setError('Invalid credentials');
        }

        setIsLoading(false);
    };

    return (
        <section>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="loginSection">
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center">
                            {/* Use your image here */}
                            {/* <img
                                src={require('../images/loginLeft.png')}
                                alt="Login Section"
                                className="img-fluid loginSecImg"
                            /> */}
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <div className="formContainer">
                                <h1 className="mb-4">Welcome Back!</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                <MdAlternateEmail />
                                            </span>
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                aria-label="email"
                                                aria-describedby="basic-addon1"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        {formErrors.email && (
                                            <small className="text-danger">{formErrors.email}</small>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text" id="basic-addon1">
                                                <FaLock />
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        {formErrors.password && (
                                            <small className="text-danger">{formErrors.password}</small>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <p className="forgotPwd text-end">Forgot Password?</p>
                                    </div>

                                    <button type="submit" className="loginBtn" disabled={isLoading}>
                                        {isLoading ? 'Loading...' : 'LOGIN'}
                                    </button>
                                    {error && <small className="text-danger">{error}</small>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
