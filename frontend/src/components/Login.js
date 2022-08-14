import React, {Component} from "react";
import axios from "axios";
import Form from "./Form";

const ERR_MESSAGE_MAP = {
    "ERR_INVALID_PASS": "Invalid Password. Please try again."
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginState: "NOT"
        }

    }

    handleLogin = (data) => {
        axios.post("api/login", {}, {headers: data })
            .then((res) => {
                this.setState({loginState: data["username"]})
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    this.setState({loginState: "ERR_INVALID_PASS"})
                }
                console.log(err);
            });
    };

    renderLogin() {
        const loginState = this.state.loginState;
        if (loginState === "NOT" || loginState.startsWith("ERR")) {
            return (
                <div>
                  <div className="loginContainer">
                      <Form onSubmit={this.handleLogin} errorMessage={loginState.startsWith("ERR") ? ERR_MESSAGE_MAP[loginState] : ""}/>
                  </div>
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