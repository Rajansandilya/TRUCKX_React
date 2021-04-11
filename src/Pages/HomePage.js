import React ,{useState} from 'react'
import { withRouter,useHistory } from "react-router-dom";

import {Container, Table ,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function Home(){
  const history = useHistory();
    const [items, setItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    // const [search, setSearch] = useState();
    React.useEffect(() => {
        async function fetchData() {
          var data = await fetch(`https://reqres.in/api/users`).then(res => {
            return res.json();
          });
        //  console.log(data);
          setItems(data.data);
          setSearchItems(data.data)
          // console.log("items are",items.length)
          
        }
        fetchData();
      }, []);
      
      const editusers = (item) => {
        history.push({
         pathname: "/editUser",
          state: { id: item.id },
        });
      };

      const deleteRow=(id, e)=>{  
        axios.delete(`https://reqres.in/api/users/${id}`)  
          .then(res => {  
            // console.log(res);  
             console.log(res.data);  
        
            const posts = items.filter(item => item.id !== id);  
            //setItems(posts)
           // this.setState({ posts });
            // console.log(posts)  
          })  
      }  
      const handleSubmit = () => {
        if(document.getElementById("searchBar").value!=""){
          const fItems = items.filter((item)=>{
            return item.first_name.includes(document.getElementById("searchBar").value)||item.last_name.includes(document.getElementById("searchBar").value)||item.email.includes(document.getElementById("searchBar").value);
          })
          setSearchItems(fItems);
        }else{
          setSearchItems(items);
        }
      };
        
    return(
       <Container style={{marginTop:'100px'}}>
         <div className="row g-3" style={{marginBottom: "20px"}}>
            <div className="col-auto">
              <input type="text" className="form-control" id="searchBar" placeholder="Type here..."></input>
            </div>
            <div class="col-auto">
              <button type="submit" onClick={handleSubmit} class="btn btn-primary mb-3">Search</button>
            </div>
            <div className="col-auto">
              <Link to="/addUser"><Button  align="right" variant="primary">Add User</Button></Link> 
            </div>
          </div>
           <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Actions</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {searchItems.map((data)=>{
                    return(
                        <tr>
                        <td>{data.id}</td>
                        <td><img src={data.avatar} width="50px" height="50px" style={{borderRadius:"50%"}} alt={data.first_name}/> {data.first_name} {data.last_name}</td>
                        <td>{data.email}</td>
                        <td> <button  onClick={() => editusers(data)}>Edit</button></td>
                        <td  onClick={(e) =>deleteRow(data.id, e)}><button>Delete</button></td>
                        </tr>
                    )
                })}  
            </tbody>
            </Table>
       </Container>
    )
}

export default Home;
