// // app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Replace this with actual logic to verify user
//         const user = {
//           id: "1",
//           name: "John Doe",
//           email: credentials.email,
//         };

//         if (credentials.email === "admin@example.com" && credentials.password === "admin") {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };
