export default function ({ type, value, placeholder, onChange,name,min}) {

    return <>
        <div>
            <label className="block text-gray-700 font-medium mb-2">{value}</label>
            <div className="relative flex items-center">
                <input name={name} type={type} required {...(type === "number" ? { min: min } : {})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300" placeholder={placeholder} onChange={onChange}/>
            </div>
        </div>
    </>
}