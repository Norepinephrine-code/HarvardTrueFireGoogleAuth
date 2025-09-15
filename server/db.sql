CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title   TEXT NOT NULL,
  content TEXT NOT NULL,
  author  TEXT NOT NULL,
  date    TIMESTAMPTZ NOT NULL
);

INSERT INTO posts (title, content, author, date) VALUES
('The Rise of Decentralized Finance',
 'Decentralized Finance (DeFi) is one of the most transformative trends in blockchain. It replaces traditional financial intermediaries with peer-to-peer platforms powered by smart contracts. From lending and borrowing to trading and insurance, DeFi is reshaping how people access financial services globally.',
 'Alex Thompson', '2023-08-01T10:00:00Z'),

('The Impact of Artificial Intelligence on Modern Businesses',
 'Artificial Intelligence (AI) is no longer futuristic—it’s here. From automating repetitive tasks to generating predictive insights, AI tools are streamlining workflows and creating competitive advantages. With advances in machine learning and deep learning, businesses are solving problems once thought impossible.',
 'Mia Williams', '2023-08-05T14:30:00Z'),

('Sustainable Living: Tips for an Eco-Friendly Lifestyle',
 'Sustainability is more than a buzzword; it’s essential for our planet’s future. Small changes—like reducing plastic use, conserving energy, and supporting green companies—add up to big impacts. By making conscious choices daily, individuals can significantly reduce their environmental footprint.',
 'Samuel Green', '2023-08-10T09:15:00Z'),

('Exploring the Future of Space Travel',
 'Private companies and government agencies are reigniting humanity’s interest in space exploration. Reusable rockets, lunar missions, and ambitions to colonize Mars have shifted space travel from science fiction to tangible reality. The next decade could bring breakthroughs comparable to the Apollo era.',
 'Isabella Chen', '2023-08-15T16:45:00Z'),

('Mental Health in the Digital Age',
 'With technology dominating modern life, mental health challenges are becoming more visible. While social media connects people, it can also contribute to stress, anxiety, and isolation. Recognizing these effects and promoting digital wellness is crucial for healthier, more balanced lifestyles.',
 'David Kim', '2023-08-20T11:20:00Z'),

('The Evolution of Remote Work',
 'Remote work, accelerated by the global pandemic, has shifted from a temporary fix to a permanent option for many companies. This evolution is changing corporate culture, employee expectations, and even urban planning as people embrace more flexible work environments.',
 'Olivia Martinez', '2023-08-25T08:50:00Z');

INSERT INTO posts (title, content, author, date) VALUES
('Cybersecurity Basics for Everyday Users',
 'Strong passwords, multi-factor authentication, and software updates are simple steps that stop most attacks. By learning to spot phishing and securing devices, anyone can dramatically reduce everyday risk.',
 'Nora Patel', '2023-08-28T13:10:00Z'),

('Beyond Cryptocurrency: Practical Uses of Blockchain',
 'From supply chain tracking to digital identity, blockchain’s tamper-resistant ledgers unlock trust across industries. Real-world pilots are moving from proofs of concept to production-grade systems.',
 'Liam O’Connor', '2023-09-01T09:00:00Z'),

('Mindful Productivity: Working Smarter, Not Longer',
 'Focus beats frenzy. Techniques like time blocking and single-tasking help reclaim attention, reduce burnout, and improve the quality of work.',
 'Grace Lin', '2023-09-04T15:25:00Z'),

('3D Printing: From Prototyping to Production',
 'Additive manufacturing is shifting from rapid prototypes to end-use parts. Materials science and better printers are enabling lighter, stronger components at lower volumes.',
 'Benjamin Ortiz', '2023-09-07T10:40:00Z'),

('Climate Tech Startups to Watch',
 'Innovators are attacking emissions with carbon capture, battery storage, and regenerative agriculture. The winners will pair scientific rigor with scalable business models.',
 'Chloe Zhang', '2023-09-10T12:05:00Z'),

('A Gentle Introduction to Quantum Computing',
 'Qubits exploit superposition and entanglement to tackle certain problems faster than classical machines. Though still early, quantum algorithms could transform optimization and cryptography.',
 'Ethan Rivera', '2023-09-13T08:30:00Z'),

('Low-Code and No-Code: Empowering Citizen Developers',
 'Visual tools let non-engineers build apps quickly, accelerating experimentation. Good governance ensures these solutions remain secure, compliant, and maintainable.',
 'Priya Desai', '2023-09-16T14:45:00Z'),

('Design Thinking in Product Development',
 'Empathy, ideation, and rapid prototyping align teams around real customer needs. The process reduces risk by validating assumptions early.',
 'Marcus Lee', '2023-09-19T11:15:00Z'),

('Ethical Hacking: Defending by Attacking',
 'Authorized penetration tests expose weaknesses before criminals do. Clear scopes, responsible disclosure, and remediation plans turn findings into stronger defenses.',
 'Jade Nguyen', '2023-09-22T16:20:00Z'),

('CRISPR and the Future of Medicine',
 'Gene editing promises targeted therapies for inherited diseases. Ethical frameworks and careful trials are essential to balance progress with safety.',
 'Hannah Brooks', '2023-09-25T10:10:00Z'),

('The Electric Vehicle Charging Landscape',
 'Fast chargers and smarter grids are easing range anxiety. Interoperability standards and reliable payment experiences are key to mass adoption.',
 'Robert Alvarez', '2023-09-28T09:55:00Z'),

('Edge Computing Explained',
 'Processing data near its source cuts latency and bandwidth costs. Retail, manufacturing, and telecom are leading deployments for real-time insights.',
 'Fatima Hassan', '2023-10-01T13:35:00Z'),

('Understanding Data Privacy Regulations',
 'Frameworks like GDPR and CCPA center on transparency, consent, and user rights. Privacy by design helps teams comply without stalling innovation.',
 'Luca Romano', '2023-10-04T07:50:00Z'),

('The Digital Nomad Lifestyle: Realities and Tips',
 'Remote work enables location flexibility, but taxes, visas, and time zones add complexity. Sustainable routines keep productivity and well-being in balance.',
 'Sofia Petrov', '2023-10-07T17:05:00Z'),

('Smart Cities: Building Connected Communities',
 'Sensors and analytics improve traffic flow, energy use, and public safety. Inclusive planning ensures technology serves everyone, not just a few.',
 'Diego Fernandez', '2023-10-10T10:25:00Z'),

('AR and VR in Education',
 'Immersive experiences make complex concepts tangible and memorable. Thoughtful curriculum integration turns novelty into measurable learning gains.',
 'Yuki Tanaka', '2023-10-12T15:55:00Z'),

('Personal Finance 101: Building a Budget',
 'A simple zero-based budget clarifies income, expenses, and goals. Automating savings and debt payments compounds progress over time.',
 'Emma Johnson', '2023-10-14T09:05:00Z'),

('The Rise of Esports',
 'Competitive gaming now rivals traditional sports in viewership and sponsorship. Structured leagues and player wellness programs are professionalizing the scene.',
 'Tyler Brooks', '2023-10-15T11:45:00Z'),

('The Circular Economy: Rethinking Waste',
 'Designing products for reuse and recycling turns end-of-life into a new beginning. Businesses that close loops cut costs and environmental impact.',
 'Amara Okoye', '2023-10-18T08:20:00Z'),

('Measuring Customer Experience: Metrics that Matter',
 'NPS, CSAT, and CES offer different lenses on loyalty and effort. Pairing quantitative scores with qualitative feedback reveals the why behind the numbers.',
 'Lucas Martin', '2023-10-21T14:15:00Z');


INSERT INTO posts (title, content, author, date) VALUES
('Mastering API Design: Best Practices',
 'Consistent naming, versioning, and clear error handling make APIs easier to adopt and maintain. Thoughtful pagination and rate limits protect both clients and servers.',
 'Carter Hughes', '2023-10-24T10:30:00Z'),

('Data Visualization that Tells a Story',
 'Good charts highlight comparisons and trends without clutter. Start with the question, pick the right chart type, and label what matters.',
 'Lena Park', '2023-10-26T12:00:00Z'),

('The Psychology of Habit Formation',
 'Tiny, repeatable actions compound into lasting change. Pair cues with frictionless routines and celebrate progress to reinforce behavior.',
 'Noah Bennett', '2023-10-28T09:45:00Z'),

('Serverless Architectures: Pros and Cons',
 'Pay-per-execution scales seamlessly for spiky workloads, but cold starts, vendor lock-in, and observability require careful planning.',
 'Avery Collins', '2023-10-30T16:10:00Z'),

('The Creator Economy: Monetizing Online Content',
 'Subscriptions, memberships, and niche communities turn attention into income. Diversifying platforms reduces platform risk.',
 'Zoe Ramirez', '2023-11-02T11:35:00Z'),

('Digital Twins in Manufacturing',
 'Virtual replicas of physical assets enable predictive maintenance and faster iteration. Real-time sensor data keeps the twin in sync with reality.',
 'Mateo Oliveira', '2023-11-05T08:20:00Z'),

('Kubernetes for Beginners: What to Know',
 'Containers, pods, and services form the foundation. Start with managed clusters, use namespaces, and keep configs in version control.',
 'Harper Singh', '2023-11-08T14:55:00Z'),

('Turning Feedback into Product Roadmaps',
 'Tag and cluster insights to find themes, then validate with experiments. A transparent roadmap builds trust with customers and stakeholders.',
 'Riley Foster', '2023-11-12T10:05:00Z'),

('Accessibility First: Building Inclusive Apps',
 'Semantic HTML, keyboard navigation, and sufficient contrast improve usability for everyone. Test with screen readers and real users early.',
 'Jamal Carter', '2023-11-16T13:25:00Z'),

('Blockchain Interoperability: The Next Frontier',
 'Cross-chain bridges and standards aim to move assets and data safely between networks. Robust security and decentralization remain key challenges.',
 'Natalie Brooks', '2023-11-21T15:40:00Z');





CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO agents (name) VALUES
('Abad, Alexander Co'),
('Ramos, Hadriel H.'),
('Kim, Ashley P.'),
('Chen, Marcus L.'),
('Garcia, Sofia R.'),
('Patel, Rohan S.'),
('Johnson, Maya T.'),
('Nguyen, David K.'),
('O''Connor, Liam J.'),  -- apostrophe escaped
('Zhang, Wei'),
('Smith, Olivia J.'),
('Hernandez, Carlos M.'),
('Lee, Hannah S.'),
('Brown, Ethan A.'),
('Santos, Maria L.'),
('Wilson, Noah R.'),
('Park, Ji-woo'),
('Martinez, Elena V.'),
('Davis, Chloe B.'),
('Torres, Gabriel D.');

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  agent_id INT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  title    TEXT NOT NULL,
  content  TEXT NOT NULL,
  created_at DATE NOT NULL
);

INSERT INTO reviews (agent_id, username, title, content, created_at) VALUES
(1, 'Alice Johnson', 'Great experience!', 'Very professional and responsive. Highly recommend!', '2024-09-01'),
(1, 'Bob Smith', 'Quick process', 'Helped us find an apartment quickly. Smooth process.', '2024-09-05'),
(2, 'Carlos Hernandez', 'Good but slow response', 'Took a while to reply but overall good experience.', '2024-09-07'),
(3, 'David Lee', 'Informative tour', 'Gave us a great tour and explained everything clearly.', '2024-09-08'),
(2, 'Emily Clark', 'Very helpful', 'Answered all my questions and was very patient.', '2024-09-09'),
(3, 'Frank Miller', 'Smooth transaction', 'Everything went smoothly from start to finish.', '2024-09-10'),
(1, 'Grace Kim', 'Friendly and knowledgeable', 'Knew the area well and gave great advice.', '2024-09-11'),
(2, 'Hannah Brown', 'Would use again', 'Would definitely work with this agent again.', '2024-09-12'),
(3, 'Ian Wright', 'Above and beyond', 'Went above and beyond to help us.', '2024-09-13'),
(1, 'Julia Evans', 'Not satisfied', 'Communication could have been better.', '2024-09-14'),
(2, 'Kevin Turner', 'Excellent service', 'Very satisfied with the service provided.', '2024-09-15'),
(3, 'Laura Scott', 'Helpful and polite', 'Polite and always willing to help.', '2024-09-16'),
(1, 'Mike Davis', 'Fast and efficient', 'Process was fast and efficient.', '2024-09-17'),
(2, 'Nina Patel', 'Great negotiation skills', 'Negotiated a great deal for us.', '2024-09-18'),
(3, 'Oscar Reed', 'Very professional', 'Handled everything professionally.', '2024-09-19'),
(1, 'Paula Green', 'Responsive and helpful', 'Always responded quickly to my questions.', '2024-09-20'),
(2, 'Quentin Brooks', 'Knowledgeable agent', 'Knew the market very well.', '2024-09-21'),
(3, 'Rachel Adams', 'Smooth closing', 'Closing process was smooth and easy.', '2024-09-22'),
(1, 'Sam Carter', 'Would recommend', 'Would recommend to friends and family.', '2024-09-23'),
(2, 'Tina Foster', 'Great communication', 'Kept me updated throughout the process.', '2024-09-24');

SELECT a.id, a.name, rev.username, rev.title, rev.content, rev.created_at
FROM agents a
LEFT JOIN reviews rev ON a.id = rev.agent_id

SELECT a.id, a.name, rev.username, rev.title, rev.content, rev.created_at FROM agents a LEFT JOIN reviews rev ON a.id = rev.agent_id;

CREATE INDEX IF NOT EXISTS posts_id_desc ON posts (id DESC);