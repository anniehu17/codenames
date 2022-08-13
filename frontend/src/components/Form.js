import React from 'react';
import ReactDOM from 'react-dom';

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className="loginLabel" >{label}</label>
        <input ref={ref} type={type} className="loginInput" />
      </div>
    );
});

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form className="loginForm" onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button className="loginButton" type="submit">Login</button>
        </div>
      </form>
    );
};

export default Form