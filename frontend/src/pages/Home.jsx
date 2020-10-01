import React, { Component } from 'react'
import Navbar from '../components/Navbar';

class Home extends Component {

    constructor(props) {

        super(props);

        console.log("constructor");

        this.state = {
            auth: false,
        }

    }

    render() {
        console.log("Render");
        return (
            <div className="container">
                <Navbar path="/login" linktext="Login" />
                <h3 style={{textAlign: "center"}}>Home</h3>
            </div>
        );
    }

    componentDidMount() {
        console.log("Component did mount");
        const auth = localStorage.getItem("auth");
        this.setState({ auth: auth });
    }

}

export default Home;