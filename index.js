const express = require("express");
const cors = require("cors"); // Import the CORS package
const app = express();

// Enable CORS for all routes
app.use(cors()); // This will allow all domains to access your server

const fetchTrendingAnime = async () => {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          description
          genres
          averageScore
          episodes
          status
          startDate {
            year
            month
            day
          }
        }
      }
    }
  `;

  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Define the /trending route after fetching data
    app.get("/trending", (req, res) => {
      res.send(data.data.Page.media);
    });

    console.log(data.data.Page.media); // Trending anime data
  } catch (error) {
    console.error("Error fetching trending anime:", error);
  }
};

fetchTrendingAnime();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get("/", (req, res) => {
  res.send("Hello World something");
  console.log("Hello World");
});
