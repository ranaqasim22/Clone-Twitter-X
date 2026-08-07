export const dummyUsers = [
  { id: 'u1', name: 'Maya Chen', username: 'mayacodes', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: 'u2', name: 'Jordan Lee', username: 'jordanlee', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'u3', name: 'Ava Patel', username: 'avapatel', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 'u4', name: 'Theo Martin', username: 'theomartin', avatar: 'https://i.pravatar.cc/150?img=68' },
]

export const dummyTweets = [
  { id: 'tweet-1', user: dummyUsers[0], content: 'Good morning! Building something small and useful today.', createdAt: '2026-08-05T08:30:00Z', replies: 12, retweets: 8, likes: 124, likedByCurrentUser: false, retweetedByCurrentUser: false },
  { id: 'tweet-2', user: dummyUsers[1], content: 'The best feature requests often start as a sentence from a real user.', createdAt: '2026-08-05T08:10:00Z', replies: 5, retweets: 19, likes: 203, likedByCurrentUser: true, retweetedByCurrentUser: false },
  { id: 'tweet-3', user: dummyUsers[2], content: 'CSS grid remains one of my favorite tools on the web.', createdAt: '2026-08-05T07:55:00Z', replies: 18, retweets: 31, likes: 390, likedByCurrentUser: false, retweetedByCurrentUser: true },
  { id: 'tweet-4', user: dummyUsers[3], content: 'A short walk is surprisingly effective at debugging a stubborn problem.', createdAt: '2026-08-05T07:20:00Z', replies: 9, retweets: 14, likes: 177, likedByCurrentUser: false, retweetedByCurrentUser: false },
  { id: 'tweet-5', user: dummyUsers[0], content: 'Shipping the first version is an invitation to learn, not the finish line.', createdAt: '2026-08-04T19:45:00Z', replies: 24, retweets: 44, likes: 521, likedByCurrentUser: true, retweetedByCurrentUser: true },
  { id: 'tweet-6', user: dummyUsers[1], content: 'Today’s playlist: focused work, no lyrics, plenty of coffee.', createdAt: '2026-08-04T18:30:00Z', replies: 3, retweets: 2, likes: 66, likedByCurrentUser: false, retweetedByCurrentUser: false },
  { id: 'tweet-7', user: dummyUsers[2], content: 'Design systems are communication systems first.', createdAt: '2026-08-04T16:15:00Z', replies: 16, retweets: 27, likes: 288, likedByCurrentUser: false, retweetedByCurrentUser: false },
  { id: 'tweet-8', user: dummyUsers[3], content: 'Reminder: make time to celebrate the tiny wins.', createdAt: '2026-08-04T14:05:00Z', replies: 7, retweets: 11, likes: 147, likedByCurrentUser: true, retweetedByCurrentUser: false },
  { id: 'tweet-9', user: dummyUsers[0], content: 'What is one developer tool you cannot imagine working without?', createdAt: '2026-08-04T11:40:00Z', replies: 42, retweets: 6, likes: 175, likedByCurrentUser: false, retweetedByCurrentUser: false },
  { id: 'tweet-10', user: dummyUsers[2], content: 'Readable code is a kindness to your future self and teammates.', createdAt: '2026-08-04T09:10:00Z', replies: 11, retweets: 33, likes: 412, likedByCurrentUser: false, retweetedByCurrentUser: true },
]

export const trendingTopics = [
  { category: 'Technology · Trending', topic: '#ReactJS', posts: '125K posts' },
  { category: 'Sports · Trending', topic: 'Champions League', posts: '84.2K posts' },
  { category: 'Trending in Pakistan', topic: '#Karachi', posts: '42.8K posts' },
  { category: 'Music · Trending', topic: 'New Music Friday', posts: '31.6K posts' },
  { category: 'Business · Trending', topic: 'AI Startups', posts: '28.4K posts' },
]

export const suggestedUsers = [
  { id: 'suggestion-1', name: 'Sarah Drasner', username: 'sarah_edo', avatar: 'https://i.pravatar.cc/150?img=49' },
  { id: 'suggestion-2', name: 'Kent C. Dodds', username: 'kentcdodds', avatar: 'https://i.pravatar.cc/150?img=53' },
  { id: 'suggestion-3', name: 'Fireship', username: 'fireship_dev', avatar: 'https://i.pravatar.cc/150?img=11' },
]

export const dummyNotifications = [
  { id: 'notification-1', type: 'like', name: 'Maya Chen', text: 'liked your post', time: '2m' },
  { id: 'notification-2', type: 'retweet', name: 'Jordan Lee', text: 'reposted your post', time: '18m' },
  { id: 'notification-3', type: 'follow', name: 'Ava Patel', text: 'followed you', time: '1h' },
  { id: 'notification-4', type: 'mention', name: 'Theo Martin', text: 'mentioned you: “Great point!”', time: '3h' },
  { id: 'notification-5', type: 'like', name: 'Sarah Drasner', text: 'liked your post', time: 'Yesterday' },
]
