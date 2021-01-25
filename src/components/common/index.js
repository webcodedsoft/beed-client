import React from 'react';
import _ from 'lodash'
import moment from 'moment'
import Countdown from "react-countdown";


export const SingleAuction = ({ auctions }) => {


    const Completionist = () => <h6><b>Auction Closed</b></h6>

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{hours} Hrs:{minutes} Min:{seconds} secs left</span>;
        }
    };

  return (
      <>
          {auctions.length > 0 && auctions.map((auction, index) => (

              <div className="job-listing" key={index}>
                    <div className="job-listing-details">
                        <div class="salary-box">
                            <div class="salary-types job-listing-company-logo"><img src={base.baseUrl+"/uploads/" + auction.image} alt={auction.image} />
                            <div className="timers">{auction.startDate < moment().format() ? <h6><b>Auction Closed</b></h6> : <h6><b><Countdown date={auction.endDate} renderer={renderer} /></b></h6>}</div>
                            </div>
                        </div>
                        <div className="job-listing-description">
                            <h5 className="job-listing-company title">Title: {auction.title} </h5>
                            <h6 className="job-listing-company">Start Date: {moment(auction.startDate).format('MMM D, YYYY h:mm a')}</h6>
                            <h6 className="job-listing-company padding-top-5">End Date: {moment(auction.endDate).format('MMM D, YYYY h:mm a')}</h6>
                        </div>
                    </div>
                </div>
          ))}	
    </>
  );
}



export function ImageReader(file, response) {
    let fileReader = new FileReader();

    var match = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (file) {
        if (file.size > 1055391) {
            return response({ ImageFile: '', ImageFileData: [], message: "File size must not greater than 1.0MB", status: false });
        } else if (!_.includes(match, file.type)) {
            return response({ ImageFile: '', ImageFileData: [], message: "Only png, gif, jpeg, jpg file is accepted", status: false });

        } else {
            fileReader.onload = () => {

                const file_data = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: fileReader.result
                }
                //Add file
                return response({ ImageFile: file, ImageFileData: [file_data], message: "Good file uploaded", status: true });
            }

            if (file) {
                fileReader.readAsDataURL(file);
                //console.log("Below", fileReader);
            }
        }
    } 

}

export const base = {
    baseUrl: 'https://beed-server.herokuapp.com',
}


export default { SingleAuction, ImageReader, base }