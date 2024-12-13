export default function NextButton({onClick}) {


    return <>
        <div >
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition" onClick={onClick}>
                Next
            </button>
        </div>

    </>
}