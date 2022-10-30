export default function NumberButtons ({id , handleDisplay}) {
    
    return (
        <div id={id} className='button' onClick={(e) => handleDisplay(e, id)}>{id}</div>
    )
}