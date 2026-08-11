import MainContent from './MainContent'
import RightSidebar from './RightSidebar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl justify-center">
      <Sidebar />
      <MainContent />
      <RightSidebar />
    </div>
  )
}

export default Layout
