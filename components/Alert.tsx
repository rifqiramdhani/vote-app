import { useState } from "react";
import Button from "./Button";
import { createRoot } from "react-dom/client";

interface Props {
    isOpen?: boolean;
    title?: string;
    message?: string;

    positiveBtntext?: string;
    negativeBtntext?: string;

    onPositiveClick?: () => void;
    onNegativeClick?: () => void;
}

function Alert(props: Props) {
    const [isOpen, setIsOpen] = useState(props.isOpen)

    return (
        <div
            className={`relative z-10 ${!isOpen && "hidden"}`}
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-zinc-900 bg-opacity-40 trasition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center text-center items-center">
                    <div className="relative transform overflow-hidden bg-white shadow-xl transition-all p-4 rounded-md">
                        {/* content */}
                        <div className="w-full p-5 text-center">
                            <p className="text-2xl font-bold">{props.title || "Title"}</p>

                            <p className="text0lg">{props.message || "Message here"}</p>

                            <div className="space-x-3 mt-5">
                                <button className="text-sm bg-zinc-100 px-2 py-1 hover:bg-zinc-200" onClick={() => {props.onNegativeClick; setIsOpen(false)}}>
                                    {props.negativeBtntext || "Kembali"}
                                </button>

                                <Button 
                                    className={`${!props.onPositiveClick && "hidden"}`} 
                                    onClick={() => { props.onPositiveClick && props.onPositiveClick(); setIsOpen(false) }} 
                                    text={props.positiveBtntext || "Ya"} 
                                />
                            </div>
                        </div>
                        {/* end content */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export function showAlert(props: Props) {
    const alert = document.createElement("div")
    alert.id = "alert"
    document.body.appendChild(alert)
    const root = createRoot(alert);
    root.render(
        <Alert 
            isOpen={true} 
            title={props.title} 
            message = {props.message}
            positiveBtntext = {props.positiveBtntext}
            negativeBtntext = {props.negativeBtntext}
            onPositiveClick = {props.onPositiveClick}
            onNegativeClick={props.onNegativeClick}
        />
    )
}