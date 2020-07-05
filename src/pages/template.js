import React from 'react'
import { Link } from "gatsby"
import Header from "../components/Header";
import '../components/all.sass'

export default (props) => (
    <div>
        <Header />
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </nav>
        {props.children}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </div>
);
