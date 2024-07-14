import { PiCards } from "react-icons/pi";

export default function Hero(){
    return(
        <>
        <div className="text-white flex gap-6 border w-full">
            <button>Best</button>
            <button><PiCards/></button>
        </div>
        </>
    )
}