import React from 'react';
import './navbar2.css'

const SecondaryNavbar = ({toggleDbConnection,toggleQueryTestCaseConnection,toggleUpdateTestCaseConnection,toggleNewTestCaseConnection,toggleUpdateRunableConnection,toggleHomePageCaseConnection}) => {
    return (
        <nav className="secondary-navbar">
            <ul>   
                <li><a onClick={toggleUpdateRunableConnection}>Home</a></li>
                <li><a onClick={toggleNewTestCaseConnection}>New Test Case</a></li>
                <li><a onClick={toggleUpdateTestCaseConnection}>Update Test Case</a></li>
                <li><a onClick={toggleQueryTestCaseConnection}>Query</a></li>
            </ul>
        </nav>
    );
};

export default SecondaryNavbar;
