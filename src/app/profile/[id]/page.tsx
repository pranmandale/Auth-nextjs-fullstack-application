export default function UserProfilePage({params}: any) {
    return (
        <div>
            <h1>profile page</h1>

            <hr />
            <p className="text-4xl">
                Profile page
                 <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
                 </p>
        </div>
    )
}