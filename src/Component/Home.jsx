import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Link } from 'react-router-dom';
import Header from './Header';
// import House from '';

function Home() {
    return (
        <>
            <Header></Header>
            <div className='container my-5'>
                <div className="row">
                    <div className="col">
                        <h3 className='text-white'>What we do !</h3>
                        <p className='text-white'>Welcome to our rental home web application, 
                            where finding your perfect home is made simple and hassle-free.</p>
                        <p className='text-white'>
                        With our user-friendly interface, you can easily browse through a variety of listings, each accompanied
                         by detailed descriptions, high-quality images, and key features.
                        </p>
                    </div>
                    <div className="col">
                        <img className="image" src={'/images/rent.png'} style={{ width: '300px', height: '300px' }} alt=""></img>
                    </div>
                    <div className="col">
                    <h3 className='text-white'>What you can do !</h3>
                        <p className='text-white'>You can search for rental houses at no cost, view house images, 
                        contact owners, and search for houses based on your expectations</p>
                        <p className='text-white'>
                        You can act as a house renter by posting your house on this website. 
                        Customers can view your house and decide if they would like to rent it.
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home