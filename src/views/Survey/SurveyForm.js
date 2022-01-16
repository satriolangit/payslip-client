import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Alert from "react-s-alert";
import AuthContext from "../../context/auth/authContext";
import { ApiUrl, AlertOptions } from "../../setting";
import logo from "../../assets/img/logo_catering.png";

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    CardFooter,
    Input,
    } from "reactstrap";
  

const SurveyForm = ({match, history}) => {

    const authContext = useContext(AuthContext);
    const { user } = authContext;
    
    const[data, setData] = useState({        
        reason: "",
        submittedBy: "",
        result:"",
        department:""
    });

    const {reason, result, department} = data;
    const [files, uploadFiles] = useState([]);
    const [preview, setPreview] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);

    let filesArray = [];
    let filesCollection = [];    

    useEffect(() => {
        fetchData();
      }, []);    


      
  const fetchData = async () => {
    try {
      const url = ApiUrl + "/survey/department";
      const res = await axios.get(url);
      const list = res.data.data;

      setDepartmentList(list);
      console.log(list);
    } catch (err) {
      console.log(err);
    }
  };

    const handleResultChange = e => {
        setData({...data, result: e.target.value});
        
        if(result === "puas") {
            filesArray = [];
            filesCollection = [];
            uploadFiles([]);
            setPreview([]);
        }
      };

    const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });
    
    const handleClearForm = () => {
        setData({reason: "", submittedBy: "", result:"", department: ""});
        filesArray = [];
        filesCollection = [];
        uploadFiles([]);
        setPreview([]);
    }

    const handleUploadChange = e => {
        filesArray.push(e.target.files);
        for (let i = 0; i < filesArray[0].length; i++) {
            filesCollection.push(URL.createObjectURL(filesArray[0][i]))
        }
        uploadFiles([...files, e.target.files[0]]);
        setPreview([...preview, filesCollection]);        
    }

    const isValidForm = () => {
        if(result === "tidak_puas" && files.length <= 0) {
            Alert.warning("Silahkan melampirkan foto.", AlertOptions);    
            return false;                    
        } 
        else if(reason === "")
        {
            Alert.warning("Alasan harus diisi.", AlertOptions);    
            return false;     
        }
        else if(department === "")
        {
            Alert.warning("Departemen harus diisi.", AlertOptions);    
            return false;     
        } 
        else 
        {
            return true;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const survey = {
            submittedBy: user.employee_id,
            result: result,
            reason: reason,
            department: department
        };

        try {
            let formData = new FormData();
            formData.append("data", JSON.stringify(survey));

            files.map(file => (
                formData.append("images", file)
            ));

            console.log(files);
            console.log(formData);
                  
            const url = ApiUrl + "/survey/submit";
            
            if(isValidForm()) {

                const result = await axios.post(url, formData, {
                    headers: {
                    "Content-Type": "multipart/form-data"
                    }
                });
        
                console.log(result);
        
                if (result.data.result === "FAIL") {
                    Alert.error(result.data.message, AlertOptions);
                } else {
                    Alert.info("Survey sudah terkirim", AlertOptions);
                    handleClearForm();
                }
            }

          } catch (err) {
            //console.log(err.response);
            Alert.error(err.response.data.message, AlertOptions);
          }        

        
    }

    const renderUploadFile = () => {
        if(result === "tidak_puas") {
            return (
                <FormGroup row>
                  <Col md="4">Photo</Col>
                  <Col md="8">
                  <div>
                      <input
                        type="file"
                        onChange={handleUploadChange}
                        accept="image/*|MIME_type"
                      />
                    </div>                    
                  </Col>
                </FormGroup>
            );
        }
    }

    const renderPhoto = () => {        
        return ((preview).map((res, index) => (
            <img key={index} src={res} alt="..." className="img-thumbnail survey-attachment"/>                        
        )));
    }

    const renderDepartmentOptions = () => { 
        return(
            departmentList.map((e)=> (
                <option value={e.department_code}>{e.department_name}</option>
            ))
        );
    } 

    return (
        <div>
            <div className = "animated fadeIn">
                <Row>
                    <Col md="12">
                        <Form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <div className="row">
                                        <div className="col-md-12 center-text">
                                            <img src={logo} style={{maxWidth: "150px", maxHeight: "auto"}} alt="logo_survey"/>                                        
                                        </div>                                        
                                    </div>                         
                                    <div className="row">
                                        <div className="col-md-12 center-text">
                                        <h6>                                        
                                                Lapor catering adalah media control terbaru untuk kualitas catering yang lebih baik<br></br>
                                                Silahkan sampaikan apa saja yang menjadi keluhan ketidakpuasan anda atau kepuasan anda.
                                            </h6>    
                                        </div>  
                                    </div>       
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label>Penilaian Catering</Label>
                                        </Col>
                                        <Col md="8">
                                        <FormGroup check inline>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioResult1"
                                                onChange={handleResultChange}
                                                value= "puas"
                                                checked={result ==="puas"}
                                            />
                                            <Label className="form-check-label" check>
                                                Puas
                                            </Label>
                                            </FormGroup>
                                            <FormGroup check inline>
                                            <Input
                                                className="form-check-input"
                                                type="radio"
                                                name="radioResult2"
                                                onChange={handleResultChange}
                                                value="tidak_puas"
                                                checked={result === "tidak_puas"}
                                            />
                                            <Label className="form-check-label" check>
                                                Tidak Puas
                                            </Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label>Alasan</Label>
                                        </Col>
                                        <Col md="8">
                                            <textarea name="reason" className="form-control" row="5" value={reason} onChange={handleChange}>

                                            </textarea>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label>Departemen</Label>
                                        </Col>
                                        <Col md="8">
                                            <select name="department" className="form-control" onChange={handleChange}>
                                                {renderDepartmentOptions()}
                                            </select>                                            
                                        </Col>
                                    </FormGroup>
                                    {renderUploadFile()}
                                    <FormGroup row>
                                        <Col md="12">
                                            {renderPhoto()}
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                <Button type="submit" size="sm" color="primary">
                                    <i className="fa fa-dot-circle-o"></i> Send
                                </Button>
                                <Button
                                    type="reset"
                                    size="sm"
                                    color="danger"
                                    onClick={handleClearForm}
                                >
                                <i className="fa fa-ban"></i> Cancel
                                </Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SurveyForm;
