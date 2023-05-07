import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const showPage = () => {
    const [show, setShow] = useState(null)
    const {showId} = useParams()

    return(
        <div>

        </div>
    )
}

export default showPage