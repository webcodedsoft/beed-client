import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Datetime from 'react-datetime';
import post from '../images/post.jpg'
import { ImageReader } from './common'
import { createAuction } from './services';

export default class CreateAuction extends Component {

    state = {
        title: '',
        startDate: new Date(),
        endDate: null,
        image: null,
        postImages: [],
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input
        this.setState({ [name]: value })
    }

    handleDateChange = (date, type) => {
        this.setState({ [type]: date.toDate() })
    }

    handleFileChange = (e) => {
        const file = e.currentTarget.files[0];
        ImageReader(file, response => {
            if (!response.status) {
                this.setState({ message: response.message })
            } else {
                this.setState({ image: response.ImageFile, postImages: response.ImageFileData })
            }
        });

    }

    handleSubmit = () => {
        const { title, startDate, endDate, image } = this.state

        const formData = new FormData();
        formData.append("title", title);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("image", image);

        createAuction(formData, res => {
            if (!res.status) {
                this.setState({
                    message: res.message, title: '', startDate: new Date(), endDate: null, image: null, postImages: [] })
            } else {
                this.setState({ message: res.message, title: '', startDate: new Date(), endDate: null, image: null, postImages: [] })
            }
        })
    }

    render() {
        const { title, startDate, endDate, postImages, message } = this.state

        return (
            <div>
                <div className="row">
                    <div className="col-xl-2"></div>
                    <div className="col-xl-8">
                        <Link to="/" className="button ripple-effect">Back</Link>
                        <div className="dashboard-box margin-top-0">
                            <div className="headline">
                                <h3><i className="icon-feather-folder-plus" /> Create Auction</h3>
                            </div>
                            <form encrypt="multipart/form-data">
                                <div className="content with-padding padding-bottom-10">
                                    {message && <div className="notification notice closeable"><p>{message} </p></div> }
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="submit-field">
                                                <h5>Title</h5>
                                                <input type="text" className="with-border" name="title" onChange={this.handleChange} value={title} placeholder="Enter auction title" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Start Date</h5>
                                                <Datetime onChange={(e) => this.handleDateChange(e, "startDate")} value={startDate}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>End Date</h5>
                                                <Datetime onChange={(e) => this.handleDateChange(e, "endDate")} value={endDate} />
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="col-auto">
                                                <div className="avatar-wrapper">

                                                    {postImages.length ?
                                                        postImages.map((file, idx) => {
                                                            return (
                                                                <img key={idx} className="profile-pics" alt="Images Here" name="image" src={file.data} />
                                                            );
                                                        })
                                                        :
                                                        <img className="profile-pic" alt="Images Here" src={post} />
                                                    }

                                                    <div className="upload-button" />
                                                    <input className="file-upload" type="file" accept="image/*" />
                                                </div>
                                                <div className="uploadButton margin-top-0">
                                                    <input className="uploadButton-input" onChange={this.handleFileChange} type="file" accept="image/*" id="upload" name="profilePic" />
                                                    <label className="uploadButton-button ripple-effect" htmlFor="upload">Upload Image</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <center>
                                        <div className="col-xl-12">
                                            <button type="button" onClick={this.handleSubmit} className="button ripple-effect big margin-top-30"> Post Auction</button>
                                        </div>
                                    </center>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}
