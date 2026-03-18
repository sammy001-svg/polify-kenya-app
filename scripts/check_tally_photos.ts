import { getResults } from "../actions/tallying";
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });

async function run() {
  const data = await getResults('national');
  console.log(JSON.stringify(data.results.map(r => ({ name: r.candidate_name, party: r.party, authUrl: r.photo_url })), null, 2));
}
run();
