import { Link } from "react-router-dom";

export default function Button({value1,value2,value3,to,onClick}) {

    return <>
        <div className="!mt-12">
            <button type="button" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none" onClick={onClick}>
                {value1}
            </button>
        </div>
        <p className="text-gray-800 text-sm mt-6 text-center">{value2}<a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1"> <Link to={to}>{value3}</Link> </a></p>
    </>
}