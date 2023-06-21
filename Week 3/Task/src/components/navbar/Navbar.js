import React from 'react'
import "./Navbar.css"

function Navbar({ Link }) {
    return (
        <>
            <nav className='navbar_main_class'>
                <div className=''>
                    <ul className='navbar-list'>
                        <Link className="navbar-list-item" to='/'>Wallet Balance</Link>
                        <Link className="navbar-list-item" to='/transactions'>Transactions</Link>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar