import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL_Local = process.env.API_URL?process.env.API_URL:'http://127.0.0.1:8000';

export const AuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {

                const { email, password } = credentials;
                
                const userData = await fetch(API_URL_Local+'/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ email: email,  password:password}),
                });

                const userInfo = await userData.json();
                if(userData.status != 200){
                    throw new Error("Invalid credentials");
                }


                return {
                    name: userInfo.user.name,
                    email: userInfo.access_token,
                    image:userInfo.user
                  };

                
                  
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        // error: '/auth/error',
        // signOut: '/auth/signout'
    },

    // callbacks: {
    //     session: async (session) => {
    //       if (!session) return;
      
    //       const client = await fetch(API_URL_Local+'/api/user', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify({ email: email}),
    //       });
      
    //       const userInfo = await userData.json();
    //       return {
    //         session: {
    //           user: {
    //             id: userInfo.id,
    //             name: userInfo.name,
    //             email: userInfo.email,
    //             ssc_user:userInfo.ssc_user,
    //             smrc_user:userInfo.smrc_user,
    //             pis_user:userInfo.pis_user,
    //             is_admin:userInfo.is_admin,
    //           }
    //         }
    //       };
    //     },
    //   },
}

export default NextAuth(AuthOptions);
