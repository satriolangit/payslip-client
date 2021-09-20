import React from 'react'

export default function Welcome() {

    const handleSurveyClick = () => {
        console.log("survey clicked");
    }

    const handlePayslipClick = () => {
        console.log("payslip clicked");
    }

    const handleIdeaBoxClick = () => {
        console.log("idea box clicked");
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <a href="!#" onClick={handleSurveyClick}>Survey Catering</a>
                <a href="!#" onClick={handlePayslipClick}>Payslip</a>
                <a href="!#" onClick={handleIdeaBoxClick}>Idea Box</a>
            </div>
        </div>
    )
}
