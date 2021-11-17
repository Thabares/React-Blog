import "./topbar.css"

export default function TopBar() {
    return (
        <div className="top">
            <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">HOME</li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">WRITE</li>
                    <li className="topListItem">LOGOUT</li>
                </ul>
            </div>
            <div className="topRight">
                <img
                className="topImg"
                src="https://images.pexels.com/photos/9443322/pexels-photo-9443322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/>
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
