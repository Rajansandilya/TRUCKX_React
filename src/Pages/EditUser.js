import React,{useState} from 'react';
import axios from 'axios';
import {Container,Row,Col,Button,Form,Card} from 'react-bootstrap';
import { withRouter, useLocation } from "react-router-dom";
function EditUser(props){
    const location = useLocation();
    
    const [input, setInput] = useState([]);
    // console.log(input)
    const handleChange = (e)=>{
        input[e.target.name] = e.target.value;
        if (e.target.type === "checkbox") {
          input[e.target.name] = e.target.checked ? 1 : 0;
        }
        setInput({ ...input });
    }
    const handleSubmit = async(e) =>{
        const user = {
            first_name:input["first_name"],
            second_name:input["second_name"],
            email:input["email"],
            avatar:input["imageUrl"]
         }
        const response = await axios({
            method: 'PUT',
            url: `https://reqres.in/api/users/${props.id}`,
            data: user
          });
        console.log(response.data)
        
     }

    return(
        <div>
            <Container style={{marginTop:"100px"}}>
            <Card style={{padding:"40px"}}>
                <h4 style={{marginBottom:"40px"}}><b>EDIT USER</b></h4>
                <Row>
                    <Col>
                        <Form.Control  onChange={handleChange}  name="first_name" type="text" placeholder="Enter first name" />
                    </Col>
                    <Col>
                        <Form.Control  onChange={handleChange} name="second_name" type="text" placeholder="Enter second name" />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Control  onChange={handleChange} name="email" type="email" placeholder="Enter E-mail" />
                    </Col>
                    <Col>
                        <Form.Control  onChange={handleChange} name="imageUrl" type="link" placeholder="Enter image url" />
                    </Col>
                </Row>
                <br/>
                <Button onClick={handleSubmit} align="right" variant="primary" style={{margin:'20px'}}>Edit User</Button>
            </Card>
        </Container>
        </div>
    )
}

export default EditUser;