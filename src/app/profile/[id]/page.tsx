

export default function UserProfilePage({ params }: any) {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-600'>
            <div className='text-center'>
                <h1 className='text-2xl font-bold text-white'>Profile Page</h1>
                <hr className='my-4 border-gray-400' />
                <p className='text-white'>
                    Profile page
                    <span className='p-2 ml-2 rounded bg-orange-300 text-black'>{params.id}</span>
                </p>
            </div>
        </div>
    )
}
