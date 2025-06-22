/// --- FILE 1 ---
/// pages/api/geocode.js

// import fetch from 'node-fetch';

export async function POST(req) {
  const { lat, lng } = await req.json();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
//   console.log(data)

  if (data.status === 'OK') {
    return Response.json({ success: true, address: data.results[0].formatted_address });
  } else {
    return Response.json({ success: false, message: 'Unable to fetch address' }, { status: 400 });
  }
}
