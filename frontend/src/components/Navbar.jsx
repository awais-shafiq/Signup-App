import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <div className="container">
                <ul className="nav">
                    <li className="nav-item"><Link to="/"><span className="nav-link">Home</span></Link></li>
                    <li className="nav-item"><Link to={this.props.path}><span className="nav-link">{this.props.linktext}</span></Link></li>
                </ul>
            </div>
        );
    }

}

export default Navbar;