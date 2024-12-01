import { chat } from "../types/chat";

export const Message = (props: chat) => {
    return <div className={"rounded m-3 bg-white p-3 font-bold " + (props.isOther ? "" : "text-right") }>
        <span >
            { props.message }
        </span>
    </div>
}