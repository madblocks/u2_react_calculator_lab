export function Function ({id, handleFunction}) {
    return (
        <div id={id} className="button calc" onClick={(e) => handleFunction(e, id)}>{id}</div>
    )
}

export function Equals ({handleEquals}) {
    return (
        <div id="equal" className="button calc" onClick={handleEquals}>=</div>
    )
}