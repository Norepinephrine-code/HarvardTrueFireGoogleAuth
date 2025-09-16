/******************************************************************************************/
import { config as envConfig } from "dotenv";           // Environment Variable
import express from "express";                          // Express Server
import cors from "cors";                                // CORS
import pg from "pg";                                    // Database Connector (PostgreSQL)
import bodyParse from "body-parser";                    // Request Body Parser
import bcrypt from "bcrypt";                            // Encryption for Hash and Compare
import passport from "passport";                        // Passport.js
import GoogleStrategy from "passport-google-oauth20";    // Google OAuth
import session from "express-session";                  // Session Keeper
import connectPgSimple from "connect-pg-simple";        // Stores Sessions in Table so it persists

import helmet from "helmet";
import db from "./db.js";

import { 
  GET_AGENT_WITH_REVIEWS,
  GET_ALL_AGENTS,
  GET_POSTS,
  GET_POST_BY_ID,
  POST_AGENT_REVIEW,
  POST_CONFESSION
 } from "./SQLStatements.js";


envConfig();                                                               // for environment variables
const app = express();                                                     // Server Setup
const PORT = process.env.PORT || Number(process.env.SERVER_PORT) || 3000;  // Server Port

app.set('trust proxy', 1);                              // Trust the proxy from the Host Site
app.use(helmet());                                      // Middleware Security

app.use(express.json());                                // Similar to Body Parse but for handling the Axios default
app.use(express.urlencoded({ extended: true }));        // Similar to Body Parse but for handling the Axios default

app.use(bodyParse.urlencoded({extended:true}));         // Body Parser

app.use(cors({ 
    origin: process.env.CLIENT_URL,
    credentials: true
}));      // Allow from client server

const PgSession = connectPgSimple(session);

app.use(
  session({
    store: new PgSession({
                          pool: db,                // 👈 reuse the Pool from db.js
                          tableName: "session"
                        }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",   // allow cross-site cookies in production
      secure: process.env.NODE_ENV === "production",                       // use HTTPS cookies in production
      maxAge: 1000*60*60
    }
  })
);

app.use(passport.initialize());                         // Initialize passport
app.use(passport.session());                            // Initialize passport with cookies

/******************************************************************************************/


/******************************************************************************************/


app.get("/allAgents", async (req, res) => {
  try {
    const result = await db.query(GET_ALL_AGENTS);
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching agents: ", err.message);
    res.status(500).json({error: "Database error, cannot fetch agents"});
  }
});

app.get("/agent/:id", async (req, res) => {
  const agentId = req.params.id;

  try {
    const result = await db.query(GET_AGENT_WITH_REVIEWS,
    [agentId]);

    if (result.rows.length===0) {
      console.log("Agent: " + agentId + " does not exist");
      return res.status(404).json({error:"Agent does not exist!"});
    } else {
      console.log(result.rows[0]);
      return res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error fetching agent: ", err.message);
    return res.status(500).json({error: "Database error, cannot fetch this agent"});
  }

}); 

/*
app.get("/allAgents", async (req, res) => {
    res.status(401).json({error: "Database error."});
});
*/

app.get("/posts", async (req, res) => {
  const MAX_LIMIT = 10;
  const limit = Math.min(parseInt(String(req.query.limit ?? 10), 10) || 10, MAX_LIMIT);
  const cursor = req.query.cursor ? Number(req.query.cursor) : null; // last id you saw

  try {
    const { rows } = await db.query(GET_POSTS,
      [cursor, limit]
    );

    // Check if length has more than the limit, set that to hasMore
    const hasMore = rows.length > limit;                          
    
    // Slice the items upto the 10th
    const items = hasMore ? rows.slice(0, limit) : rows;            

    // Move Cursor to the last
    const endCursor = hasMore ? items[items.length - 1].id : null;

    res.json({ items, endCursor, hasMore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

});

app.get("/post/:id", async (req,res) => {

  const id = Number(req.params.id);

  try {
    const response = await db.query(GET_POST_BY_ID, [id]);
    if (response.rowCount > 0) {
      res.status(200).json(response.rows[0]);
    } else {
      res.status(404).json({error: "This post does not exist!"});
    }
  } catch (err) {
    res.status(500).json({error: "Internal Server Error"});
  }

});



app.post("/createReview/:id", async (req, res) => {
  const agentId = req.params.id;
  const { username, title, content, created_at } = req.body;

  if (!agentId || !username || !title || !content || !created_at) {
    return res.status(400).json({ error: "Incomplete fields!" });
  }

  try {
    const response = await db.query(POST_AGENT_REVIEW,
      [agentId, username, title, content, created_at]
    );

    if (response.rowCount > 0) {
      return res.status(201).json(response.rows[0]);
    }
    return res.status(500).json({ error: "Insert failed." });
  } catch (err) {
    return res.status(500).json({ error: "Internal error with database" });
  }
});

app.post("/posts", async (req, res) => {

  const { title, content, author, date } = req.body;

  if (!title || !content || !author || !date) {
    return res.status(400).json({ error: "Incomplete fields!" });
  }

  try {
    const result = await db.query(
      POST_CONFESSION,
      [title, content, author, date]
    );

    if (result.rowCount > 0) {
      return res.status(201).json(result.rows[0]);
    }
    return res.status(500).json({ error: "Insert failed." });
  } catch (err) {
    return res.status(500).json({ error: "Internal error with database" });
  }
});

app.get("/auth/google", 
  passport.authenticate("google", 
    {
      scope: ["profile", "email"],
    }
  )
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL + "/",   // success
    failureRedirect: process.env.CLIENT_URL + "/",   // failure
  })
);

app.get('/me', (req, res) => {

    if (req.isAuthenticated()) {
      return res.json({ email: req.user.email})
    } else {
      return res.status(404).json({error: "You are not authenticated"});
    }
})

app.get('/logout', (req, res) => {
    req.logout((error) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong' })
        }
        res.status(204).send()
    })
})



passport.use("google", 
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  }, async (accessToken, refreshToken, profile, done) =>{
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.emails?.[0]?.value]);
      if (result.rows.length > 0) {
        return done(null, result.rows[0]);        // Approved user login
      } else {
        const createUser = await db.query("INSERT INTO users (email, password) VALUES ($1,$2) RETURNING *",
          [profile.emails?.[0]?.value, "googleOAuth"]
        );
        return done(null, createUser.rows[0]);    // Created new user
      }
    } catch (err) {
      return done(err);                           // System Error
    }
  })
);

// Store Cookie with user object
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Retrieve from user object from Cookie
passport.deserializeUser((user, cb) => {
  cb(null, user);
});



app.listen(PORT, ()=>{
    console.log("Server is listening on port: " + PORT);
});