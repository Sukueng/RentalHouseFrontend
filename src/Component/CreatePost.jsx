import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { NavDropdown, NavItem, Nav, Button } from "react-bootstrap"
import swal from "sweetalert2"
// import "./Login.css"
// import "./CreatePost.css"

function CreatePost() {
    const [effect] = useTypewriter({
        words: ["...", "..."],
        loop: {},
        typeSpeed: 300,
        deleteSpeed: 100
    })
    const [loading, setloading] = useState(false)

    const mail = localStorage.getItem("email");
    const navigate = useNavigate();

    const [post, setpost] = useState([])

    if (localStorage.getItem("name") === null) {
        navigate("/login")
    }


    //for post datas
    const [data, setdata] = useState({
        price: "",
        district: "",
        pincode: "",
        address: "",
        imageurl: "",
        posteddata: "",
        email: localStorage.getItem("email"),
        mobile: "",
        ownername: localStorage.getItem("name"),
    })

    // get post for the specific user
    const getPost = () => {
        axios.post("https://rentalhousebackend-api.onrender.com/post/getPostByMail", { email: mail }).then((result) => {
            
            console.log(loading)
            // console.log(result.data)

            setpost(result.data)

        }).catch((error) => {
            console.log("error accured")
        }).finally(() => {
            setloading(false)
        })
    }


    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setdata({ ...data, posteddata: formattedDate.toString() })



        // const getPost = () => {
        //     axios.post("https://rentalhousebackend-api.onrender.com/post/getPostByMail", { email: mail }).then((result) => {
        //         console.log(result.data)
        //         setloading(true)
        //         // setpost(prevPost => [...prevPost, ...result.data]);
        //         setpost(result.data)

        //     }).catch((error) => {
        //         console.log("error accured")
        //     }).finally(() => {
        //         setloading(false)
        //     })
        // }
        setloading(true)
        getPost()


    }, []);


    //convert image into hex code

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setdata({ ...data, imageurl: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const logout = () => {
        localStorage.removeItem("name");
        navigate("/")
    }
    const submit = (e) => {

        e.preventDefault();

        if (data.address != "" && data.district != "" && data.email != "" && data.imageurl != "" && data.mobile != "" && data.ownername != "" && data.pincode != "" && data.posteddata != "" && data.price != "") {
            axios.post('https://rentalhousebackend-api.onrender.com/post/add', data).then((result) => {
                console.log(result.data)
                swal.fire('Done !', 'Post Added succesfully', 'success')
                getPost()
                setpopup(false)
            }).catch((error) => {
                console.log("error accured")
            })
        } else {
            swal.fire('Cancelled', 'All fileds are required', 'error')
        }





    }

    const [popup, setpopup] = useState(false)

    const popupWindow = () => {
        setpopup(true)
    }

    const deletePost = (item) => {
        swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("https://rentalhousebackend-api.onrender.com/post/delete", item).then((result) => {
                    getPost();
                }).catch((error) => {
                    console.log("error accured")
                })
                console.log('Deleted');
            } else if (result.dismiss === swal.DismissReason.cancel) {
                console.log('Cancelled');
            }
        });

    }



    return (
        <div>
            <Header></Header>



            <div className="container">
                <div className="row ">
                    <div className="col-10">
                        <h5 className='text-white text-center'>My Post</h5>
                    </div>

                    <div className="col d-flex justify-content-start ms-4">
                        <button className='btn btn-sm btn-success' style={{ fontSize: '14px', padding: '4px 8px' }} onClick={popupWindow}>New Post</button>
                    </div>
                </div>
                {loading === true ? <div className='d-flex justify-content-center mt-5'>
                        <h1 className='text-center text-white'>Loading <span className='text-white'>{effect}</span></h1>
                    </div> : ''}
                <div className="row mt-4 " style={{ backgroundColor: '#676C6C ', borderRadius: '10px' }}>


                    {post.map((item) => (

                        <div className="col-12 col-md-3 col-lg-3 py-3" >
                            <div className="card h-80" style={{ overflow: 'hidden' }}>
                                <div className="image-container" style={{ width: '300px', height: '200px', overflow: 'hidden' }}>
                                    <img className='img-fluid rounded object-fit-cover h-100' src={item.imageurl} alt="Base64 to Image" />
                                </div>
                                <div class="card-body bg-secondary">
                                    <h6 className='text-white fs-9'>Price : {item.price} </h6>
                                    <h6 className='text-white fs-9' key={item.id}>Address : {item.address}</h6>
                                    <h6 className='text-white fs-9' key={item.id}>Mobile : {item.mobile}</h6>
                                    <button className='btn btn-danger' onClick={() => deletePost(item)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {popup == true ? <div className="postcontainer-fluid position-fixed top-0 start-0" style={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.7)", height: "100%", }}>
                <form className='mx-auto my-4' style={{ overflow: 'hidden' }} >
                    <button className='btn btn-danger' style={{ width: '10%', marginLeft: 'auto' }} onClick={() => setpopup(false)}> X </button>
                    <h4 className='text-center '>Add Post</h4>
                    <div className="row">
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label ">Price</label>
                                <input type="number" className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, price: e.target.value })} required />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label ">Address</label>
                                <input type="text" className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, address: e.target.value })} required />
                            </div>

                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label ">Pincode</label>
                                <input type="number" className="form-control form-control-sm" id="exampleInputPassword1" onChange={(e) => setdata({ ...data, pincode: e.target.value })} required />
                            </div>
                        </div>

                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label ">District</label>
                                <input type="text" className="form-control form-control-sm" id="exampleInputPassword1" onChange={(e) => setdata({ ...data, district: e.target.value })} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label ">Contact Number</label>
                                <input type="number" className="form-control form-control-sm" id="exampleInputPassword1" onChange={(e) => setdata({ ...data, mobile: e.target.value })} required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label ">House Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>

                        </div>
                    </div>



                    <button type="submit" class="btn btn-primary mt-2" onClick={submit}>Submit</button>
                </form>
            </div > : ""}


        </div>
    )
}
export default CreatePost
