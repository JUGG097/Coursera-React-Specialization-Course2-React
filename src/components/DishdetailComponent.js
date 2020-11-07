import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Label, Col, Row, Breadcrumb, BreadcrumbItem, Button, 
  Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from "react-redux-form"
import {Loading} from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';

    // componentDidMount() {
    //     console.log("Dishdetail Component componentDidMount invoked")
    // }

    // componentDidUpdate() {
    //     console.log("Dishdetail Component componentDidUpdate invoked")
    // }

function RenderDish({dish}) {
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isNavOpen: false,
          isModalOpen: false
      };
      this.toggleNav = this.toggleNav.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleNav() {
      this.setState({
          isNavOpen: !this.state.isNavOpen
      });
  }

  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comments);
    
}

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
      <span className="fa fa-edit fa-lg"></span> Submit Comment
    </Button>


    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Col md={12}>
                      <Label htmlFor="rating">Rating</Label>
                    </Col>
                    
                    <Col md={12}>
                      <Control.select model=".rating" name="rating"  className="form-control"
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        
                        </Control.select>
                    </Col>
                    
                  </Row>

                  <Row className="form-group">
                    <Col md={12}>
                      <Label htmlFor="author">Your Name</Label>
                    </Col>
                    
                    <Col md={12}>
                      <Control.text model=".author" name="author"  className="form-control"
                         validators={{
                          minLength: minLength(3),
                          maxLength: maxLength(15)
                      }}>
                      </Control.text>

                      <Errors className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                      
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters of less"
                                    }}>

                                </Errors>
                    </Col>
                  
                  </Row>

                  <Row className="form-group">
                    <Col md={12}>
                      <Label htmlFor="comments">Comment</Label>
                    </Col>
                    
                    <Col md={12}>
                      <Control.textarea model=".comments" name="comments" rows="6"  className="form-control">
                          
                        </Control.textarea>
                    </Col>
                  
                  </Row>

                  <Row className="form-group">
                          <Col md={12}>
                              <Button type="submit" color="primary">
                                  Submit
                              </Button>
                          </Col>
                  </Row>

                </LocalForm>

            </ModalBody>
          </Modal>
    </React.Fragment>
    )
  }
}


function RenderComments({comments, addComment, dishId}) {
  if (comments == null || comments.length === 0) {
    return (
      <div></div>
    );
  }

  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
      </li>
    );
  });

  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        { renderedComments }
      </ul>
      <CommentForm dishId={dishId} addComment={addComment}/>
    </div>
  );
}

  

      
const Dishdetail = (props) => {
    if (props.isLoading) {
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    else if (props.errMess) {
      return(
        <div className="container">
          <div className="row">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      );
    }

    else if (props.dish != null) {
      return (
        <div className="container">
          <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId = {props.dish.id} />
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
}
       
      



export default Dishdetail;