import { GoArrowLeft } from "react-icons/go";
import styles from "../styles/BackButton.module.css";
function BackButton() {
    return (
        <button className={styles.backButton}>
            <GoArrowLeft /> <span>Back</span>
        </button>
    );
}
export default BackButton;