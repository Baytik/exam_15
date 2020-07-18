import React, {Component} from 'react';
import './Place.css';
import {connect} from "react-redux";
import {addMessage, createImages, deleteComment, deleteImage, fetchPlace} from "../../store/actions/placesAction";
import {apiURL} from "../../apiURL";

class Place extends Component {

    state = {
        images: null,
        comment: '',
        quality: '',
        service: '',
        interior: ''
    };

    componentDidMount() {
        this.props.fetchPlace(this.props.match.params.id);
    }

    fileChangeHandler = e => {
        this.setState({[e.target.name]: e.target.files[0]})
    };

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    createNewImage = async () => {
        if (this.state.images === null) {
            alert('Please enter image');
        } else {
            const newImage = new FormData();
            newImage.append('images', this.state.images);
            newImage.append('recipeId', this.props.match.params.id);
            await this.props.createImages(newImage)
        }
    };

    addComment = async () => {
        if (this.state.comment === '' || this.state.quality === '' || this.state.service === '' || this.state.interior === '') {
            alert('Please enter comment and rate')
        } else {
            const comment = {
                comment: this.state.comment,
                rate: {
                    quality: this.state.quality,
                    service: this.state.service,
                    interior: this.state.interior
                }
            };
            await this.props.addMessage(comment, this.props.match.params.id);
            this.props.fetchPlace(this.props.match.params.id);
        }
    };

    deleteCommentHandler = async (id) => {
        await this.props.deleteComment(this.props.match.params.id, id)
    };

    removeImage = async (image) => {
        await this.props.deleteImage(this.props.match.params.id, image)
    };

    render() {
        return (
            <div className="recipe-block">
                {this.props.place && (
                    <div>
                        <div className="flex-block">
                            <div className="left-block">
                                <h1>{this.props.place.title}</h1>
                                <p>{this.props.place.description}</p>
                            </div>
                            <div className="right-block">
                                {this.props.place.image && (
                                    <img src={apiURL + '/uploads/' + this.props.place.image}
                                         alt={this.props.recipe_id}/>
                                )}
                            </div>
                        </div>
                        <div className="images-flex">
                            {this.props.place.images && this.props.place.images.map(image => (
                                <div key={image}>
                                    <img src={apiURL + '/uploads/' + image} alt={image}/>
                                    <div>
                                        {this.props.user && this.props.user.role === 'admin' && (
                                            <button onClick={() => this.removeImage(image)}>Remove image</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rating">
                            <h2>Ratings</h2>
                            <p>Overall: {this.props.place.rating ? this.props.place.rating : 0}&#9733;</p>
                            <p>Quality of food: {this.props.place.quality ? this.props.place.quality : 0}&#9733;</p>
                            <p>Service of quality: {this.props.place.service ? this.props.place.service : 0}&#9733;</p>
                            <p>Interior: {this.props.place.interior ? this.props.place.interior : 0}&#9733;</p>
                        </div>
                        <div className="comments-block">
                            <h2>Comments</h2>
                            {this.props.place.comments && this.props.place.comments.map(comment => (
                                <div className="comments" key={comment._id}>
                                    <p>On {comment.date + ', ' + comment.author} wrote</p>
                                    <p>{comment.comment}</p>
                                    <p>Quality: {comment.quality}&#9733;</p>
                                    <p>Service: {comment.service}&#9733;</p>
                                    <p>Interior: {comment.interior}&#9733;</p>
                                    {this.props.user && this.props.user.role === 'admin' && (
                                        <button className="btn"
                                                onClick={() => this.deleteCommentHandler(comment._id)}>delete</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {this.props.user && this.props.user._id !== this.props.place.user && (
                    <div className="comment-block">
                        <h3>Add a comment</h3>
                        <div>
                            <textarea name="comment" cols="50" rows="5" onChange={this.changeInputHandler}/>
                        </div>
                        <span className="rate-block">
                            <span>Quality</span>
                            <select name="quality" onChange={this.changeInputHandler}>
                                <option></option>
                                <option value="1">1    &#9733;</option>
                                <option value="2">2    &#9733;</option>
                                <option value="3">3    &#9733;</option>
                                <option value="4">4    &#9733;</option>
                                <option value="5">5    &#9733;</option>
                            </select>
                        </span>
                        <span className="rate-block">
                            <span>Service</span>
                            <select name="service" onChange={this.changeInputHandler}>
                                <option></option>
                                <option value="1">1    &#9733;</option>
                                <option value="2">2    &#9733;</option>
                                <option value="3">3    &#9733;</option>
                                <option value="4">4    &#9733;</option>
                                <option value="5">5    &#9733;</option>
                            </select>
                        </span>
                        <span className="rate-block">
                            <span>Interior</span>
                            <select name="interior" onChange={this.changeInputHandler}>
                                <option></option>
                                <option value="1">1    &#9733;</option>
                                <option value="2">2    &#9733;</option>
                                <option value="3">3    &#9733;</option>
                                <option value="4">4    &#9733;</option>
                                <option value="5">5    &#9733;</option>
                            </select>
                            <button onClick={this.addComment}>Add</button>
                        </span>
                    </div>
                )}
                {this.props.user && (
                    <>
                        <h3>Add a photo</h3>
                        <div className="add-photo-block">
                            <span>Image</span>
                            <input type="file" name="images" onChange={this.fileChangeHandler}/>
                        </div>
                        <button className="upload-btn"
                                onClick={this.createNewImage}
                        >
                            Upload
                        </button>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    place: state.places.place
});

const mapDispatchToProps = dispatch => ({
    fetchPlace: (id) => dispatch(fetchPlace(id)),
    createImages: (data) => dispatch(createImages(data)),
    addMessage: (comment, id) => dispatch(addMessage(comment, id)),
    deleteComment: (id, commentId) => dispatch(deleteComment(id, commentId)),
    deleteImage: (id, image) => dispatch(deleteImage(id, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(Place);