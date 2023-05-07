// import axios because we going to do POST request in this page
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios'

//When we put a new book then it will be updated through usestate
import {useState } from 'react'



const Add = () => {
    const [book, setBook] = useState({
        title: "",
        about: "",
        price: null,
        cover: ""
    })

const [error, setError] = useState(false);
const navigate = useNavigate();


const handleChange = (e) =>{
    setBook ((prev) => ({...prev, [e.target.name]: e.target.value}));
}

const handleClick = async (e) => {
    e.preventDefault();
try{
    await axios.post("http://localhost:8800/books", book);
    navigate("/")
}catch (err){
    console.log(err)
    setError (true)
}
}
return(
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='Book title' name='title' onChange={handleChange} />
        <input type="textarea" placeholder='Descirption' name='about' onChange={handleChange} />
        <input type="number" placeholder='Book Price' name='price' onChange={handleChange} />
        <input type="text" placeholder='Book cover' name='cover' onChange={handleChange} />
        <button onClick={handleClick}> Add </button>

        {error && "Something is wrong"}

        <Link to="/">See All Books</Link>

    </div>
)
}

export default Add
