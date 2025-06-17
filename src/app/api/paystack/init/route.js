// src/app/api/paystack/init/route.js

export async function POST(req) {
    try {
      const body = await req.json();
      const { email, amount } = body;
  
      const response = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url: 'http://localhost:3000/menu',
        }),
      });
  
      const result = await response.json();
    //   console.log("Paystack response:", result);


  
      if (!result.status) {
        console.error("Paystack error:", result);
        return Response.json({ message: "Failed to initialize payment", error: result.message }, { status: 400 });
      }
      
  
      return Response.json(result); // returns authorization_url, access_code, reference
    } catch (error) {
      console.error("Paystack init error:", error);
      return Response.json({ message: "Server error", error: error.message }, { status: 500 });
    }
  }
  