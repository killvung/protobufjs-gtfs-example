/**
 * This NodeJS program decodes a pb example file fetched from Capitol Metro API with protobufjs library
 */
const { load } = require("protobufjs");
const fs = require('fs');
// Uncommen this if ready to request pb through wire
// const axios = require('axios').default;

// this pb uses gtfs-realtime schema from Google
// https://developers.google.com/transit/gtfs-realtime/gtfs-realtime-proto
const loadMessageSchema = async () => {
  const root = await load("./gtfs-realtime.proto");
  return root;
}

// Am example file has been attached in this repo without constantly requesting it from Capitol Metro API
const loadPBExample = async () => {
  const data = fs.readFileSync(__dirname + '/vehiclepositions.pb')
  return data;
}

// After loading 
Promise.all([loadMessageSchema(), loadPBExample()])
  .then(([schema, positionPB]) => {
    const FeedMessage = schema.lookupType("transit_realtime.FeedMessage");
    const decoded = FeedMessage.decode(positionPB);
    console.log(JSON.stringify(decoded, null, 1));
  })

/**
 * Uncomment this after making sure
 * Capital Metro won't chase you down the street
 * for requesting data from their API
 */
// const loadPBReal = async () => {
//   const response = await axios.get('https://data.texas.gov/download/eiei-9rpf/application%2Foctet-stream');
//   return response
// }
