import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getProfileUrl } from "@/actions/actions";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession(authOptions);
  const profileUrl = await getProfileUrl(session?.user.userId);

  return (
    <html lang="en">
      <Provider>
          <body className="font-primary flex flex-col h-screen justify-between items-center">
            <NavBar profilePicUrl={profileUrl} />
            {children}
            <div>footer placeholder</div>
          </body>
      </Provider>
    </html>
  );
}
