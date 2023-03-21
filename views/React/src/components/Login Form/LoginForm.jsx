import React, {useState, useEffect} from "react";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = () => {
    const initialValues = { username: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value });
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        axios.post("http://localhost:5000/api/insert",
            {accountName: formValues.username,
            accountPassword: formValues.password
        }).then(() => {
            alert("Sucessfully inserted");
        });
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length == 0 && isSubmit) {
            console.log(formValues);
        }

    }, [formErrors])
    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors;
    
        
    }
    return (
        <form onSubmit={handleLogIn}>
            <div className="login-cover">
                    <h1>Login</h1>
                    <input 
                        value = {formValues.username} 
                        type="text" placeholder="username" 
                        id="username" 
                        name="username"
                        onChange={handleChange}
                    />
                    <p>{formErrors.username}</p>
                    <input 
                        value = {formValues.password} 
                        type="password" 
                        placeholder="password" 
                        id="password" 
                        name="password" 
                        onChange={handleChange}
                    />
                    <p>{formErrors.password}</p>
                    <button> Log In</button>
                    <p className="login-text">Or login with</p>

                    <div className="alt-login">
                        <div className="facebook"></div>
                        <div className="google"></div>
                    </div>
            </div>
        </form>
    )
}   

export default LoginForm;
