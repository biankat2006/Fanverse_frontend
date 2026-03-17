import Images from "./Images"

import logo from "../photos/logo.png"
import banner from "../photos/fnafGame.webp"

export default function GameCard({ title, creator }) {
    return (
        <div className="col-lg-4 col-md-2 col-sm-6">
            <div className="card " style={{ background: '#452458' }}>
                <Images Class="card-img-top img img-fluid img-thumbnail" src={banner} altszov="Baner pic" height={2} />
                <div className="card-body">
                    <div className="row">
                      
                        <div className="column">
                            <p style={{color:"white", fontWeight:"bold"}}>{title}</p>
                            <div className="d-flex align-items-center">
                            <Images src={logo} altszov={"creator pfp"} Class="ps me-3"/>
                            <p style={{color:"white", fontWeight:"bold", marginTop:15}}>{creator}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}