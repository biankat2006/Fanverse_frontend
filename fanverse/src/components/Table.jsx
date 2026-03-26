import Button from "./Button"

export default function Table({allUsers}){
    return(
        <>
        <table className="table table-striped table-hover table-dark rounded-3 overflow-hidden">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Profile Picture</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allUsers?.map(user => (
                    <tr className="text-center" key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.pfp}</td>
                        <td>{user.role}</td>
                        <td className="d-flex justify-content-evenly">
                            <Button szin='btn btn-sm btn-warning' text='Szerkesztés' onClick={''}/>
                            <Button szin='btn btn-sm btn-danger px-4' text='Törlés' onClick={''}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}