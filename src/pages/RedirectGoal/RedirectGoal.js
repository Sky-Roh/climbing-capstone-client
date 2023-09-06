import "./RedirectGoal.scss"
import { useNavigate } from "react-router-dom";
const RedirectGoal = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/goalsetting")
    }, 2000);


    return (
        <div className="signUp">
            <h2 className="signUp__success">Success</h2>
            <div className="success">
                <div class="success-icon">
                    <div class="success-icon__tip"></div>
                    <div class="success-icon__long"></div>
                </div>

            </div>
        </div>

    );
};

export default RedirectGoal;