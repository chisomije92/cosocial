export const Users = [
  {
    _id: 1,
    profilePicture: "assets/person/1.jpeg",
    username: "Safak Kocaoglu",
  },
  {
    _id: 2,
    profilePicture: "assets/person/2.jpeg",
    username: "Janell Shrum",
  },
  {
    _id: 3,
    profilePicture: "assets/person/3.jpeg",
    username: "Alex Durden",
  },
  {
    _id: 4,
    profilePicture: "assets/person/4.jpeg",
    username: "Dora Hawks",
  },
  {
    _id: 5,
    profilePicture: "assets/person/5.jpeg",
    username: "Thomas Holden",
  },
  {
    _id: 6,
    profilePicture: "assets/person/6.jpeg",
    username: "Shirley Beauchamp",
  },
  {
    _id: 7,
    profilePicture: "assets/person/7.jpeg",
    username: "Travis Bennett",
  },
  {
    _id: 8,
    profilePicture: "assets/person/8.jpeg",
    username: "Kristen Thomas",
  },
  {
    _id: 9,
    profilePicture: "assets/person/9.jpeg",
    username: "Gary Duty",
  },
  {
    _id: 10,
    profilePicture: "assets/person/10.jpeg",
    username: "Safak Kocaoglu",
  },
];

export const Posts = [
  {
    _id: 1,
    desc: "Love For All, Hatred For None.",
    photo: "assets/post/1.jpeg",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 1.",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 1",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 7,
      }
    ]
  },
  {
    _id: 2,
    photo: "assets/post/2.jpeg",
    date: "15 mins ago",
    userId: 2,
    like: 2,
    comment: 1,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 2.",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 2",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 7,
      }
    ]
  },
  {
    _id: 3,
    desc: "Every moment is a fresh beginning.",
    photo: "assets/post/3.jpeg",
    date: "1 hour ago",
    userId: 3,
    like: 61,
    comment: 2,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 3.",
        photo: "assets/post/4.jpeg",
        date: "5 mins ago",
        userId: 4,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 3",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 7,
      }
    ]
  },
  {
    _id: 4,
    photo: "assets/post/4.jpeg",
    date: "4 hours ago",
    userId: 4,
    like: 7,
    comment: 3,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 4.",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 4",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 7,
      }
    ]
  },
  {
    _id: 5,
    photo: "assets/post/5.jpeg",
    date: "5 hours ago",
    userId: 5,
    like: 23,
    comment: 5,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 5.",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 5",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 7,
      }
    ]
  },
  {
    _id: 6,
    photo: "assets/post/6.jpeg",
    date: "1 day ago",
    userId: 6,
    like: 44,
    comment: 6,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 6.",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 6",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 7,
      }
    ]
  },
  {
    _id: 7,
    desc: "Never regret anything that made you smile.",
    photo: "assets/post/7.jpeg",
    date: "2 days ago",
    userId: 7,
    like: 52,
    comment: 3,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 7.",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 2",
        photo: "assets/post/4.jpeg",
        date: "5 mins ago",
        userId: 4,
        like: 7,
      }
    ]
  },
  {
    _id: 8,
    photo: "assets/post/8.jpeg",
    date: "3 days ago",
    userId: 8,
    like: 15,
    comment: 1,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 8.",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 8",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 7,
      }
    ]
  },
  {
    _id: 9,
    desc: "Change the world by being yourself.",
    photo: "assets/post/9.jpeg",
    date: "5 days ago",
    userId: 9,
    like: 11,
    comment: 2,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 9.",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 9",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 7,
      }
    ]
  },
  {
    _id: 10,
    photo: "assets/post/10.jpeg",
    date: "1 week ago",
    userId: 10,
    like: 104,
    comment: 12,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 10.",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 9,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 10",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 7,
      }
    ]
  },
  {
    _id: 11,
    desc: "Great Love exists.",
    photo: "assets/post/1.jpeg",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 11.",
        photo: "assets/post/3.jpeg",
        date: "5 mins ago",
        userId: 3,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 11",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 7,
      }
    ]
  },
  {
    _id: 12,
    desc: "Great hate exists.",
    photo: "assets/post/1.jpeg",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
    replies: [
      {
        id: 1,
        desc: "This is a reply to the post with id 12.",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 8,
      },
      {
        id: 2,
        desc: "2nd Reply to post with id 12",
        photo: "assets/post/2.jpeg",
        date: "5 mins ago",
        userId: 2,
        like: 7,
      }
    ]
  },
];
