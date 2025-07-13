// app/api/delivery-fee/route.js

export async function POST(req) {
    try {
      const body = await req.json();
      const { origin, destination } = body;
  
      if (!origin || !destination) {
        return new Response(JSON.stringify({ error: "Missing coordinates" }), {
          status: 400,
        });
      }
  
      const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
      const res = await fetch(
        `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: origin.lat,
                  longitude: origin.lng,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.lat,
                  longitude: destination.lng,
                },
              },
            },
            travelMode: "DRIVE",
          }),
        }
      );
  
      const data = await res.json();
      console.log(data);
  
      if (!res.ok || !data.routes || !data.routes.length) {
        if (data.error) { // Check for Google's API error structure
            console.error("Google Routes API Error:", data.error.message);
            return new Response(JSON.stringify({ error: data.error.message || "Failed to get route from Google API" }), {
                status: data.error.code || 500, // Use Google's status code if available
            });
        }

        return new Response(JSON.stringify({ error: "Enter address to estimate delivery fee" }), {
          status: 500,
        });
      }
  
      const distanceMeters = data.routes[0].distanceMeters;
      const distanceKm = distanceMeters / 1000;
  
      const baseRate = 230; // per km
      const minFee = 1500;
      const deliveryFee = Math.max(Math.ceil(distanceKm * baseRate), minFee);
  
      return new Response(
        JSON.stringify({
          distanceKm: distanceKm.toFixed(2),
          deliveryFee,
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Delivery fee error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
  