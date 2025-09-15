let PostArray = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is one of the most transformative trends in blockchain. It replaces traditional financial intermediaries with peer-to-peer platforms powered by smart contracts. From lending and borrowing to trading and insurance, DeFi is reshaping how people access financial services globally.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer futuristic—it’s here. From automating repetitive tasks to generating predictive insights, AI tools are streamlining workflows and creating competitive advantages. With advances in machine learning and deep learning, businesses are solving problems once thought impossible.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than a buzzword; it’s essential for our planet’s future. Small changes—like reducing plastic use, conserving energy, and supporting green companies—add up to big impacts. By making conscious choices daily, individuals can significantly reduce their environmental footprint.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 4,
    title: "Exploring the Future of Space Travel",
    content:
      "Private companies and government agencies are reigniting humanity’s interest in space exploration. Reusable rockets, lunar missions, and ambitions to colonize Mars have shifted space travel from science fiction to tangible reality. The next decade could bring breakthroughs comparable to the Apollo era.",
    author: "Isabella Chen",
    date: "2023-08-15T16:45:00Z",
  },
  {
    id: 5,
    title: "Mental Health in the Digital Age",
    content:
      "With technology dominating modern life, mental health challenges are becoming more visible. While social media connects people, it can also contribute to stress, anxiety, and isolation. Recognizing these effects and promoting digital wellness is crucial for healthier, more balanced lifestyles.",
    author: "David Kim",
    date: "2023-08-20T11:20:00Z",
  },
  {
    id: 6,
    title: "The Evolution of Remote Work",
    content:
      "Remote work, accelerated by the global pandemic, has shifted from a temporary fix to a permanent option for many companies. This evolution is changing corporate culture, employee expectations, and even urban planning as people embrace more flexible work environments.",
    author: "Olivia Martinez",
    date: "2023-08-25T08:50:00Z",
  },
  {
    id: 7,
    title: "The Evolution of Remote Work",
    content:
      "Remote work, accelerated by the global pandemic, has shifted from a temporary fix to a permanent option for many companies. This evolution is changing corporate culture, employee expectations, and even urban planning as people embrace more flexible work environments.",
    author: "Olivia Martinez",
    date: "2023-08-25T08:50:00Z",
  },
  {
    id: 8,
    title: "The Evolution of Remote Work",
    content:
      "Remote work, accelerated by the global pandemic, has shifted from a temporary fix to a permanent option for many companies. This evolution is changing corporate culture, employee expectations, and even urban planning as people embrace more flexible work environments.",
    author: "Olivia Martinez",
    date: "2023-08-25T08:50:00Z",
  },
];

// Add 24 more dummy posts
for (let i = 9; i <= 30; i++) {
  PostArray.push({
    id: i,
    title: `Dummy Post #${i}`,
    content: `This is the content for dummy post number ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur euismod, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.`,
    author: `Author ${i}`,
    date: `2023-09-${(i % 30 + 1).toString().padStart(2, "0")}T12:00:00Z`,
  });
}

export default PostArray;
