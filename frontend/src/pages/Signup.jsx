import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Success from '../components/Success';
import Warning from '../components/Warning';

class Signup extends Component {

    state = {
        user: {
            name: '',
            email: '',
            password: '',

        },
        validity: {
            invalid: false,
            message: '',
        },
        signupStatus: false
    }

    onChange = (event) => {

        let user = this.state.user;

        let property = event.target.name;
        let val = event.target.value;

        //user.setState({[property]: val});

        user[property] = val;

        this.setState({ user })

        //console.log(this.state);

    }

    signup = (event) => {

        // console.log(this.state);

        event.preventDefault();

        //console.log(this.state);

        if (this.state.user.email.length < 4) {
            this.setState({ validity: { invalid: true, message: "Enter valid email address!" } });
            return;
        }

        if (this.state.user.password.length < 6) {
            this.setState({ validity: { invalid: true, message: "Weak password! Password length should atleast be 6." } });
            return;
        }

        //console.log(JSON.stringify(this.state));



        fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: this.state.user.name,
                email: this.state.user.email,
                password: this.state.user.password
            })
        })
            .then(res => res.json())
            .then(res => {

                if (res.success) {

                    this.setState({ validity: { invalid: false, message: "Signup successful" }, signupStatus: true });

                    setTimeout(function () {
                        this.props.history.push("/");
                    }.bind(this), 2000);

                } else {
                    if (res.err.columns[0] === "email") {
                        this.setState({ validity: { invalid: true, message: "Email already exist!" }, signupStatus: false });
                    }
                }

                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        let warning;
        if (this.state.validity.invalid) {
            warning = <Warning title="Invalid" message={this.state.validity.message} />
        }

        return (
            <div className="container">
                <Navbar path="/login" linktext="Login" />
                <div className=""></div>
                <div className="row mt-5">
                    <div className="col-sm-6 offset-md-3 mt-5 p-5" style={{ border: "1px solid #e1e1e1", borderRadius: "10px", boxShadow: "0 0 2px #a1a1a1" }}>
                        <form onSubmit={this.signup}>

                            <div className="form-group">
                                <label>Full Name:</label>
                                <input type="text" className="form-control" placeholder="Enter full name" name="name" onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <label>Email address:</label>
                                <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} />
                            </div>

                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.onChange} />
                            </div>

                            <div className="text-right">
                                <button type="submit" className="btn btn-primary" style={{ padding: "5px 50px 5px 50px" }}>Signup</button>
                            </div>

                        </form>
                        {this.state.signupStatus ? (
                            <span>
                                <Success title="Success" message="Signup successful" /><br />
                                <div className="text-center">
                                    <div class="spinner-border text-primary"></div>
                                </div>
                            </span>) : null}
                        {warning}
                        {/* {this.state.invalid ? <Warning title="Invalid" message={this.state.message}/> : null} */}
                    </div>



                </div>
            </div>
        );
    }

}

export default Signup;