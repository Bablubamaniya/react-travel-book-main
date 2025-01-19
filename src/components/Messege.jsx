import Emoji from "./Emoji";
import style from "../styles/Message.module.css"


function Message({emoji,txt}){
    return(
        <div className={style.message}>
            {emoji && <Emoji txt={emoji}/>}  {txt} 
        </div>
    )
}
export default Message;