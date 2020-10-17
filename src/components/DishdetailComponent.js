import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component {
    constructor(props) {
        super(props);

    }

    renderDish(dish) {
        return (
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
          </div>
        )
    }

    renderComments(dish) {

        const myComments = dish.comments.map((coms) => {
            return (
                <ul class="list-unstyled">
                    <li> {coms.comment} </li>
                    <li> -- {coms.author}, {coms.date} </li>
                </ul>
            );
        });

        if (dish.comments != null) {

            return (
                
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {myComments}
                </div>
                
            )
        }
        else {
            return (
                <div></div>
            )
        }
        
    }

    render() {

        return(
            <div className="row">
                {this.renderDish(this.props.mydishes)}
                {this.renderComments(this.props.mydishes)}
            </div>
        )
       
    }
}


export default Dishdetail;