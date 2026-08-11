import { CalendarDays, Link as LinkIcon, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import TweetList from '../components/features/tweet/TweetList'
import Header from '../components/layout/Header'
import { toggleFollowing } from '../store/slices/authSlice'

const tabs = ['Tweets', 'Replies', 'Media', 'Likes']

function ProfilePage() {
  const { username } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  const tweets = useSelector((state) => state.tweets.tweets)
  const [activeTab, setActiveTab] = useState('Tweets')
  const tweetUser = tweets.find((tweet) => tweet.user.username === username)?.user
  const isCurrentUser = currentUser?.username === username
  const profile = isCurrentUser ? currentUser : (tweetUser || { name: username, username, avatar: `https://ui-avatars.com/api/?name=${username}&background=1D9BF0&color=fff`, bio: 'Sharing thoughts, ideas, and great conversations.', followers: 0, following: 0, joinedDate: 'August 2026' })
  const profileTweets = tweets.filter((tweet) => tweet.user.username === profile.username)
  const followingUsers = currentUser?.followingUsers || []
  const profileId = profile.id || profile.username
  const isFollowing = followingUsers.includes(profileId)

  return (
    <>
      <Header />
      <section>
        {profile.coverPhoto ? <img src={profile.coverPhoto} alt="" className="h-48 w-full object-cover" /> : <div className="h-48 bg-gradient-to-r from-twitter-blue via-sky-500 to-indigo-500" />}
        <div className="relative px-4 pb-4">
          <img src={profile.avatar} alt="" className="-mt-16 h-32 w-32 rounded-full border-4 border-twitter-darker object-cover" />
          {isCurrentUser ? <button type="button" onClick={() => navigate('/settings/profile')} className="absolute right-4 top-3 rounded-full border border-twitter-lightGray px-4 py-2 font-bold text-twitter-text hover:bg-twitter-text/10">Edit profile</button> : <button type="button" onClick={() => dispatch(toggleFollowing(profileId))} className={`absolute right-4 top-3 rounded-full px-4 py-2 font-bold ${isFollowing ? 'border border-twitter-lightGray text-twitter-text hover:bg-red-500/10 hover:text-red-400' : 'bg-twitter-surface text-twitter-surfaceText hover:bg-twitter-surface/80'}`}>{isFollowing ? 'Following' : 'Follow'}</button>}
          <h2 className="mt-3 text-xl font-extrabold text-twitter-text">{profile.name}</h2>
          <p className="text-twitter-gray">@{profile.username}</p>
          {profile.bio && <p className="mt-3 whitespace-pre-wrap text-twitter-text">{profile.bio}</p>}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-twitter-gray">
            {profile.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{profile.location}</span>}
            {profile.website && <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-twitter-blue hover:underline"><LinkIcon className="h-4 w-4" />{profile.website.replace(/^https?:\/\//, '')}</a>}
            <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />Joined {profile.joinedDate || 'August 2026'}</span>
          </div>
          <div className="mt-3 flex gap-4 text-sm"><span className="text-twitter-gray"><strong className="text-twitter-text">{profile.following || 0}</strong> Following</span><span className="text-twitter-gray"><strong className="text-twitter-text">{profile.followers || 0}</strong> Followers</span></div>
        </div>
      </section>
      <div className="flex border-b border-twitter-lightGray">
        {tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative flex-1 py-4 text-sm ${activeTab === tab ? 'font-bold text-twitter-text' : 'text-twitter-gray'}`}>{tab}{activeTab === tab && <span className="absolute bottom-0 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-twitter-blue" />}</button>)}
      </div>
      {activeTab === 'Tweets' ? <TweetList tweets={profileTweets} /> : <p className="p-8 text-center text-twitter-gray">No {activeTab.toLowerCase()} yet</p>}
    </>
  )
}

export default ProfilePage
