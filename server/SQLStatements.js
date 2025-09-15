export let GET_AGENT_WITH_REVIEWS = `
  SELECT a.id,
         a.name,
         COUNT(rev.id)::INT AS "reviewCount",
         COALESCE(
           json_agg(
             json_build_object(
               'username', rev.username,
               'title', rev.title,
               'content', rev.content,
               'created_at', rev.created_at
             )
           ) FILTER (WHERE rev.id IS NOT NULL),
           '[]'
         ) AS reviews
  FROM agents a
  LEFT JOIN reviews rev ON a.id = rev.agent_id
  WHERE a.id = $1
  GROUP BY a.id, a.name;
`;

export const GET_ALL_AGENTS = `
  SELECT 
    a.id, 
    a.name, 
    COUNT(r.id)::INT AS "reviewCount"
  FROM agents a
  LEFT JOIN reviews r 
    ON a.id = r.agent_id
  GROUP BY a.id, a.name
  ORDER BY a.id;
`;

export const GET_POSTS =   `
      SELECT id, title, content, author, date
      FROM posts
      WHERE ($1::bigint IS NULL OR id < $1)   -- because we sort DESC by id
      ORDER BY id DESC
      LIMIT $2 + 1                             -- over-fetch to detect hasMore
      `;

export const GET_POST_BY_ID = `SELECT * FROM posts WHERE id = $1;`;

export const POST_AGENT_REVIEW = "INSERT INTO reviews (agent_id, username, title, content, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
export const POST_CONFESSION =  "INSERT INTO posts (title, content, author, date) VALUES ($1, $2, $3, $4) RETURNING *;";