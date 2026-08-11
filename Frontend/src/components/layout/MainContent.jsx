import { Outlet } from 'react-router-dom'

function MainContent() {
  return (
    <main className="min-h-screen w-full max-w-[600px] border-r border-twitter-lightGray">
      <Outlet />
    </main>
  )
}

export default MainContent
