import { GoArrowLeft } from "react-icons/go";
import styles from "../styles/backButton.module.css";
import { useNavigate } from "react-router";
function BackButton() {
    const navigate = useNavigate();
    function handleBack(e) {
        e.preventDefault(e); // stop submiting
        navigate(-1);
    }
    return (
        <button className={styles.backButton} onClick={handleBack}>
            <GoArrowLeft /> <span>Back</span>
        </button>
    );
}
export default BackButton;
