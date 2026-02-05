
export default function Model({ select, CloseModel }) {
    return (
        <>
            <div className="model h-100" onClick={CloseModel}>
                <div className="h-100 d-flex justify-content-center align-items-center">

                    <div onClick={(e) => { e.stopPropagation() }}>
                        <img src={select.path} alt="gatooo" />
                    </div>
                </div>
            </div>


        </>
    )
}
