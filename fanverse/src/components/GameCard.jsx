import Images from "./Images"



export default function GameCard({ title, creator, banner_pic, creator_pfp }) {
    return (
        <div className="h-100 w-100 border-0 rounded-4 overflow-hidden">
      <div className="card rounded-5" style={{ background: "#452458" }}>
        {/* Banner a szerverről */}
        <Images
          Class="card-img-top img img-fluid img-thumbnail rounded-5"
          src={`https://nodejs301.dszcbaross.edu.hu/updates/${banner_pic}`}
          altszov="Banner pic"
        />

        <div className="card-body">
          <p style={{ color: "white", fontWeight: "bold" }}>{title}</p>

          <div className="d-flex align-items-center">
            {/* Creator profilkép a szerverről */}
            <Images
              src={`https://nodejs301.dszcbaross.edu.hu/creator/${creator_pfp}`}
              altszov="creator pfp"
              Class="ps me-3 rounded-5"
            />
            <p style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>
              {creator}
            </p>
          </div>
        </div>
      </div>
    </div>
    )
}