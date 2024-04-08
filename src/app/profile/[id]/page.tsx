export default function UserProfile({params}: any) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center py-2'>
          <h1>Profile</h1>
          <hr />
          <p className="text-4xl">profile page 
          <span className="p-2 ml-2 rounded bg-orange-300 text-black hover:bg-orange-600">{params.id}</span>
          </p>
      </div>
    )
  }