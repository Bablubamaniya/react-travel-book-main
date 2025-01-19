

import style from "../styles/Spinner.module.css";

function Spinner() {
    return (
        <div className={style.spinnerBox}>
            <div className={style.spinner}></div>
        </div>
    );
}

export default Spinner;