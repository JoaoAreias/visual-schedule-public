import { getSession } from "next-auth/react";



export default function Index() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if(session) {
      return {
          redirect: {
              destination: '/app',
          },
      }
  }

  return {
    redirect: {
        destination: '/login',
    },
  }
}