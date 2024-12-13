export default function NavButton({val,onClick}){
    return<>
    <div>
              <button
                onClick={onClick}
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                {val}
              </button>
    </div>
    </>
}