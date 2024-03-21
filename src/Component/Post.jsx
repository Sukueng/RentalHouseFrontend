import React, { useEffect, useState } from 'react'
import Header from './Header'
import './Home.css';
import { Button } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import axios from "axios"

function Post() {
    const [effect] = useTypewriter({
        words: ["...", "..."],
        loop: {},
        typeSpeed: 300,
        deleteSpeed: 100
    })

    const [search, setsearch] = useState("")
    const [loading, setloading] = useState(false)
    console.log(search)

    const [post, setpost] = useState([])

    useEffect(() => {
        const getPost = () => {
            setloading(true)
            axios.get("https://rentalhousebackend-api.onrender.com/post/getall ").then((result) => {
                console.log(result.data)
                // setpost(prevPost => [...prevPost, ...result.data]);
                setpost(result.data)
            }).catch((error) => {
                console.log("error accured")
            }).finally(() => {
                setloading(false)
            })
        }
        getPost()
    }, [])



    // console.log(post)

    return (
        <div>
            <Header />


            <div className="container">

                <div className="searchconatiner d-flex justify-content-end">
                    <input type="search" id="form1" className="form-control mx-2" placeholder='Search by City' style={{ maxWidth: '300px' }} onChange={(e) => setsearch(e.target.value)} />
                    <img src="/images/search.png" style={{ height: '30px', width: '30px' }} className='p'></img>
                </div>

                <div className="row">


                    {loading === true ? <div className='d-flex justify-content-center mt-5'>
                        <h1 className='text-center text-white'>Loading <span className='text-white'>{effect}</span></h1>
                    </div> : ''}


                    {post.filter((item) => {
                        return search.toLowerCase === '' ? item : item.district.toLowerCase().includes(search)
                    }).map((item) => (

                        <div className="col-12 col-md-4 col-sm-6 mt-3 col-lg-3">
                            <div class="card " style={{ overflow: 'hidden' }}>

                                <div className="row">
                                    <div className="col-6 col-sm-12">
                                        <div className="image-container" style={{ width: '300px', height: '200px', overflow: 'hidden' }}>
                                            <img className='img-fluid rounded object-fit-cover h-100 w-800' src={item.imageurl} alt="Base64 to Image" />
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-12">
                                        <div class="card-body bg-secondary">
                                            <h6 className='text-white fs-9'>Price : {item.price} </h6>
                                            <h6 className='text-white fs-9' key={item.id}>Address : {item.address}</h6>
                                            <h6 className='text-white fs-9'>Posted on : {item.posteddata}</h6>
                                            <h6 className='text-warning fs-9'>Owner : {item.ownername}</h6>
                                            <h6 className='text-warning fs-9'>Contact : {item.mobile}</h6>
                                        </div>
                                    </div>
                                </div>
                                {/* <img src={item.imageurl} alt="Base64 to Image"></img> */}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post