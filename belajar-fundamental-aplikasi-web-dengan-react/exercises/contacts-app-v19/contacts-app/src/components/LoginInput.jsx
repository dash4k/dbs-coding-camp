import React from "react";

class LoginInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
        this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onEmailChangeHandler(event) {
        this.setState(() => {
            return {
                email: event.target.value
            };
        })
    }

    onPasswordChangeHandler(event) {
        this.setState(() => {
            return {
                password: event.target.value
            };
        })
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.login({
            email: this.state.email,
            password: this.state.password,
        });
    }

    render() {
        const { email, password } = this.state;
        
        return (
            <form onSubmit={this.onSubmitHandler} className="login-input">
                <input type="email" placeholder="Email" value={email} onChange={this.onEmailChangeHandler} />
                <input type="password" placeholder="Password" value={password} onChange={this.onPasswordChangeHandler} />
                <button>Masuk</button>
            </form>
        )
    }
}

export default LoginInput;
