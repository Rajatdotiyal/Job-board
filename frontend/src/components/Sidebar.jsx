export default function Sidebar({heading1,heading2,para1,para2}) {

    return <>
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
                <h4 className="text-white text-lg font-semibold">{heading1}</h4>
                <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">{para1}</p>
            </div>
            <div>
                <h4 className="text-white text-lg font-semibold">{heading2}</h4>
                <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">{para2}</p>
            </div>
        </div>
    </>
}