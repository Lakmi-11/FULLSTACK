import { Link } from "react-router-dom"
import { PageData } from "./PageData"


export function Navbar() {
    return (
        <>
          {PageData.map((page) => {
            return (
                <Link>
                
                </Link>
            )
          })}
        </>
    )
}