import React, { useEffect, useState } from 'react'
import Header from './Header'
import "./Login.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import swal from "sweetalert2"
import { useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("name") != null) {
            navigate("/createpost")
        }
    })

    const [login, setlogin] = useState("Signup")

    const [data, setdata] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [rsdata, rssetdata] = useState({
        rspassword1: '',
        rsemail: '',
        rspassword2: ''
    })

    const setLogin = () => {
        setlogin("Login")
    }
    const setSignin = () => {
        setlogin("Signup")
    }

    const setpassowrd = () => {
        setlogin("Reset Password")
    }

    const clearForm = () => {
        data.name = ""
        data.email = ""
        data.password = ""
    }

    const passwordReset=()=>{
        
        if(rsdata.rspassword1 === rsdata.rspassword2){
            // console.log(rsdata.rspassword1,rsdata.rspassword2)
            axios.post('https://rentalhousebackend-api.onrender.com/user/checkuserForPass', rsdata).then((result) => {
                console.log(result.data)
               if(result.data ==="ok"){
                    axios.post("https://rentalhousebackend-api.onrender.com/user/changepassword",rsdata).then((result)=>{
                        console.log(result.data)
                        if(result.data === "ok"){
                            swal.fire('Done !', 'Password changed successfully', 'success')
                            setLogin()
                        }
                    })
               }
        })
        }else{
            swal.fire('Cancelled', 'Passwords not same', 'error')
        }
    }

    const submit = (e) => {
        e.preventDefault()
        if (login == "Signup") {
            axios.post('https://rentalhousebackend-api.onrender.com/user/finduser', data).then((result) => {
                console.log(result.data)
                if (result.data == "") {
                    axios.post('https://rentalhousebackend-api.onrender.com/user/add', data).then((result) => {
                        const res = result.data
                        if (res === "ok") {
                            swal.fire('Done !', 'Account Created succesfully', 'success')
                            clearForm()
                            setLogin()
                        }
                    }).catch((error) => {
                        console.log("error accured")
                    })
                } else {
                    swal.fire('Cancelled', 'User already exit', 'error')
                    clearForm()
                    setLogin()
                }
            }).catch((error) => {
                console.log("error accured")
            })


        }
        if (login == "Login") {
            axios.post('https://rentalhousebackend-api.onrender.com/user/finduser', data).then((result) => {
                console.log(result)
                if (result.data != "") {
                    localStorage.setItem("name", result.data.name)
                    localStorage.setItem("email", result.data.email)
                    navigate("/createpost")
                } else {
                    clearForm()
                    swal.fire('Cancelled', 'User not found or incorrect data', 'error')
                }

            }).catch((error) => {
                console.log("error accured")
            })
        }

    }
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <form className='mx-auto my-4' onSubmit={submit}>
                    <h3 className='text-center '>{login}</h3>

                    {login == 'Signup' ? <div className="mb-3">
                        <label for="exampleInputEmail1" >Name</label>
                        <input type="text" className="form-control" value={data.name} id="name" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, name: e.target.value })} required />
                        <div class="mb-3">
                            <label for="exampleInputEmail1" >Email address</label>
                            <input type="email" className="form-control" value={data.email} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, email: e.target.value })} required />

                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" >Password</label>
                            <input type="password" className="form-control" value={data.password} id="password" onChange={(e) => setdata({ ...data, password: e.target.value })} required />
                        </div>
                    </div> : ""}



                    <div id="emailHelp" className="row">
                        {login == 'Login' ?
                            <>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" >Email address</label>
                                    <input type="email" className="form-control" value={data.email} id="email" aria-describedby="emailHelp" onChange={(e) => setdata({ ...data, email: e.target.value })} required />

                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" >Password</label>
                                    <input type="password" className="form-control" value={data.password} id="password" onChange={(e) => setdata({ ...data, password: e.target.value })} required />
                                </div>
                                <div className="col">
                                    <a href="#" className='small d-flex  my-3 text-decoration-none' onClick={setpassowrd}>Forgot Password ?</a>
                                </div>
                                <div className="col">
                                    <a href="#" className='small d-flex  my-3 text-decoration-none d-flex justify-content-end pe-2' onClick={setSignin}>Signup</a>
                                </div>
                                <button type="submit" class="btn btn-primary mt-2">Submit</button> </> : ""
                        }
                        {login == 'Signup' ?
                            <div className="col">
                                <a href="#" className='small text-decoration-none my-3' onClick={setLogin}>Already have Account ?</a>
                                <button type="submit" class="btn btn-primary mt-2">Submit</button>
                            </div> : ""
                        }
                    </div>


                    {login == 'Reset Password' ? <>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" >Enter Your Email</label>
                            <input type="text" className="form-control"  id="email" aria-describedby="emailHelp" onChange={(e) => rssetdata({ ...rsdata, rsemail: e.target.value })} required />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputEmail1" >New Password</label>
                            <input type="text" className="form-control"  id="email" aria-describedby="emailHelp" onChange={(e) => rssetdata({ ...rsdata, rspassword1: e.target.value })} required />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword1" >Enter Again</label>
                            <input type="password" className="form-control"  id="password" onChange={(e) => rssetdata({ ...rsdata, rspassword2: e.target.value })} required />
                        </div>

                        <div className="row">
                            <div className="col">
                                <button type="button" className='btn btn-success' onClick={()=>setLogin()}>Back</button>
                            </div>
                            <div className="col">
                                <button type='button' className='btn btn-primary' onClick={()=>passwordReset()}>Reset</button>
                            </div>
                        </div>

                    </> : ""}

                </form>
            </div>
        </div >
    )
}

export default Login