import { AtSign, Heart, Repeat2, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/layout/Header'
import { dummyNotifications } from '../data/dummyData'

const notificationTypes = {
  like: { icon: Heart, color: 'text-pink-500' },
  retweet: { icon: Repeat2, color: 'text-emerald-500' },
  follow: { icon: UserRoundPlus, color: 'text-twitter-blue' },
  mention: { icon: AtSign, color: 'text-twitter-blue' },
}

function NotificationsPage() {
  const [tab, setTab] = useState('All')
  const visibleNotifications = tab === 'Mentions' ? dummyNotifications.filter((notification) => notification.type === 'mention') : dummyNotifications

  return (
    <>
      <Header />
      <div className="flex border-b border-twitter-lightGray">
        {['All', 'Mentions'].map((label) => <button key={label} type="button" onClick={() => setTab(label)} className={`relative flex-1 py-4 font-medium ${tab === label ? 'font-bold text-white' : 'text-twitter-gray'}`}>{label}{tab === label && <span className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-twitter-blue" />}</button>)}
      </div>
      {visibleNotifications.map((notification) => {
        const { icon: Icon, color } = notificationTypes[notification.type]
        return <article key={notification.id} className="flex gap-3 border-b border-twitter-lightGray px-4 py-4 hover:bg-white/[0.03]"><Icon className={`mt-1 h-7 w-7 shrink-0 ${color}`} /><div><p className="text-white"><strong>{notification.name}</strong> {notification.text}</p><time className="text-sm text-twitter-gray">{notification.time} ago</time></div></article>
      })}
    </>
  )
}

export default NotificationsPage
