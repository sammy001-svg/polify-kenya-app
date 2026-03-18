const url = "https://envfcokkzmovpwecqfzt.supabase.co/rest/v1/election_results?select=election_candidates(id,name,party,photo_url)";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudmZjb2trem1vdnB3ZWNxZnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTc4MzUsImV4cCI6MjA4NTYzMzgzNX0.BLKOyO_C8nmQHYV0Yro60qG5GW2NeZJXIVsvr0FbIyY";

fetch(url, {
  headers: {
    "apikey": key,
    "Authorization": `Bearer ${key}`
  }
})
.then(res => res.json())
.then(data => {
  console.log(JSON.stringify(data, null, 2));
})
.catch(err => console.error(err));
