import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { SingleAuction } from './common'
import { getAuctions } from './services';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class Index extends Component {

    state = {
        auctions: [],
        isLoaded: false,
        isEmpty: false,
    }

    componentDidMount = () => {
        getAuctions(res => {
            if (res.data.length > 0) {
                this.setState({ auctions: res.data, isLoaded: true, isEmpty: false })
            } else {
                this.setState({ auctions: [], isLoaded: true, isEmpty: true })
            }
        })
    }


    render() {
        const { auctions, isLoaded, isEmpty } = this.state
        
        return (
            <div>
                <div className="full-page-container">
                    {/* <div className="side-padding"></div> */}
                    <div className="full-page-content-container" data-simplebar>
                        <div className="full-page-content-inner">
                            <Link to="/create-auction" className="button ripple-effect">Create Auction</Link>
                            <div className="listings-container grid-layout margin-top-35">
                                {!isLoaded && <center className="col-xl-12"><CircularProgress /> </center> }
                                { isLoaded && isEmpty && <center className="col-xl-12"><div className="notification notice closeable">No Auction Available</div></center> }
                                { isLoaded && !isEmpty && <SingleAuction auctions={auctions} />}
                                  
                            </div>
                        </div>
                    </div>
                    {/* <div className="side-padding"></div> */}
                </div>

            </div>
        )
    }
}
