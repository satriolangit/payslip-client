import React, {useContext} from 'react'
import LogoPayslip from '../../../assets/img/brand/logo_payslip.png';
import LogoSurvey from '../../../assets/img/logo_catering.png';
import LogoIdeabox from '../../../assets/img/logo_ideabox.png';
import SiteContext from '../../../context/site/siteContext';

export default function Welcome(props) {

    const siteContext = useContext(SiteContext);
    const {gotoPayslip, gotoSurvey, gotoIdeaBox} = siteContext;

    const handleSurveyClick = () => {
        gotoSurvey();
        props.history.push("/login");        
        
    }

    const handlePayslipClick = () => {        
        gotoPayslip()
        props.history.push("/login");        
    }

    const handleIdeaBoxClick = () => {        
        gotoIdeaBox();
        props.history.push("/login");        
    }

    return (
        <div class="row vh-100">
            <div class="col-sm-12 my-auto">
                <div class="mx-auto text-center">
                <img src={LogoSurvey} onClick={handleSurveyClick} alt="survey" style={{width: "150px", height:"auto"}}></img>
                <img src={LogoPayslip} onClick={handlePayslipClick} alt="payslip" style={{maxWidth: "200px", height:"auto"}}></img>
                <img src={LogoIdeabox} onClick={handleIdeaBoxClick} alt="ideabox" style={{maxWidth: "200px", height:"auto"}}></img>
                </div>
            </div>
        </div>                
    )
}
