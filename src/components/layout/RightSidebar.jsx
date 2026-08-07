import { Search } from 'lucide-react'
import { suggestedUsers, trendingTopics } from '../../data/dummyData'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFollowing } from '../../store/slices/authSlice'

function RightSidebar() {
  const dispatch = useDispatch()
  const followingUsers = useSelector((state) => state.auth.user.followingUsers || [])
  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 overflow-y-auto px-6 py-2 xl:block">
      <label className="relative mb-4 block">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-twitter-gray" />
        <input type="search" placeholder="Search" className="w-full rounded-full bg-twitter-dark py-3 pl-12 pr-4 text-white outline-none ring-twitter-blue placeholder:text-twitter-gray focus:ring-2" />
      </label>

      <section className="mb-4 overflow-hidden rounded-2xl bg-twitter-dark">
        <h2 className="px-4 py-3 text-xl font-extrabold text-white">What&apos;s happening</h2>
        {trendingTopics.map((trend) => (
          <button key={trend.topic} type="button" className="block w-full px-4 py-3 text-left transition hover:bg-white/5">
            <span className="block text-xs text-twitter-gray">{trend.category}</span>
            <span className="block font-bold text-white">{trend.topic}</span>
            <span className="block text-xs text-twitter-gray">{trend.posts}</span>
          </button>
        ))}
        <button type="button" className="px-4 py-4 text-twitter-blue hover:bg-white/5">Show more</button>
      </section>

      <section className="overflow-hidden rounded-2xl bg-twitter-dark">
        <h2 className="px-4 py-3 text-xl font-extrabold text-white">Who to follow</h2>
        {suggestedUsers.map((person) => (
          <div key={person.username} className="flex items-center gap-3 px-4 py-3 transition hover:bg-white/5">
            <img src={person.avatar} alt="" className="h-10 w-10 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-white">{person.name}</p>
              <p className="truncate text-sm text-twitter-gray">@{person.username}</p>
            </div>
            <button type="button" onClick={() => dispatch(toggleFollowing(person.id))} className={`rounded-full px-4 py-1.5 text-sm font-bold ${followingUsers.includes(person.id) ? 'border border-twitter-lightGray text-white hover:bg-red-500/10 hover:text-red-400' : 'bg-white text-twitter-darker hover:bg-twitter-lightGray'}`}>{followingUsers.includes(person.id) ? 'Following' : 'Follow'}</button>
          </div>
        ))}
        <button type="button" className="px-4 py-4 text-twitter-blue hover:bg-white/5">Show more</button>
      </section>
    </aside>
  )
}

export default RightSidebar
