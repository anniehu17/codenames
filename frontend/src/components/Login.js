import React, {Component} from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

const ERR_MESSAGE_MAP = {
    "ERR_INVALID_PASS": "Invalid Password. Please try again.",
    "ERR_PROFANE": "Username cannot contain profanity. Please try again."
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginState: "NOT"
        }

    }


    handleLogin = async (data) => {
        await axios.post("api/login", {}, {headers: data })
            .then((res) => {
                this.setState({loginState: data["username"]})
                data["loginState"] = "SUCCESS"
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    this.setState({loginState: "ERR_INVALID_PASS"})
                    data["loginState"] = "ERR_INVALID_PASS";
                } else if (err.response.status === 500) {
                    this.setState({loginState: "ERR_PROFANE"})
                    data["loginState"] = "ERR_PROFANE";
                }
                console.log(err);
            });

        this.props.onLogin(data);
    };

    renderLogin() {
        const loginState = this.state.loginState;
        if (loginState === "NOT" || loginState.startsWith("ERR")) {
            return (
                <div>
                  <LoginForm onSubmit={this.handleLogin} errorMessage={loginState.startsWith("ERR") ? ERR_MESSAGE_MAP[loginState] : ""}/>
                </div>
            );
        } else {
            return (
                <div className='loginSuccessContainer'>
                    <p className="loginSuccessText">Logged in as <b>{ this.state.loginState }</b></p>
                </div>
            )
        }
    }

    render() {
        return this.renderLogin();
    }

}

export default Login;