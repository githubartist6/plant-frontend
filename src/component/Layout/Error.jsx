import { NavLink } from "react-router-dom"
import "../CSS/error.css"
export const Error = () => {
    return (
        <>
            <section id="error-page">
                <div className="content">
                    <h2 className="header">404</h2>
                    <h4>Sorry! Page not found</h4>
                    <p>
                        Oops! It seems like the page you're trying to access doesn't exist. If you believe there's an issue, feel free to report it, and we'll look into ot.
                    </p>
                    <div className="btns">
                        <NavLink to="/" className="btn">return home</NavLink>
                        <NavLink to="/" className="btn">report problem</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}