import { getSession } from "next-auth/react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ActivityList from "../components/activity-list";

import client from "../lib/prismadb";
import { useState } from "react";


function App(props) {
    const [removeActivities, setRemoveActivities] = useState(false);
    
    return (
        <>
            <Navbar/>
            <ActivityList user={props.session.user} activities={props.activities} removeActivities={removeActivities} />
            <Footer user={props.session.user} removeActivities={[removeActivities, setRemoveActivities]} />
        </>
    );
}

export default App;


export async function getServerSideProps(context) {
    const session = await getSession(context);
    if(!session) {
        return {
            redirect: {
                destination: '/login',
            },
        }
    }

    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
    
    // Update the completed activities
    const updateTask = await client.task.updateMany({
        where: {
            userId: session.user.id,
            updatedAt: {
                lte: new Date(new Date().setHours(0,0,0,0) - (24 * 60 * 60 * 1000))
            },
        },
        data: {
            completed: false
        }
    });
    
    // Get the activities for the current day's schedule
    const activities = await client.task.findMany({
      where: {
        AND: [
          { userId: session.user.id },
          (JSON.parse(`{"${dayOfWeek}": true}`)),
          { completed: false }
        ]
      }
    });

    activities.map((activity) => { 
        activity.time = activity.time.split(':');
        activity.time = new Date(0, 0, 0, activity.time[0], activity.time[1]).toTimeString().split(' ')[0];
        activity.updatedAt = activity.updatedAt.toTimeString().split(' ')[0];

    });

    return {
        props: { 
            session,
            activities
         }
    }
}
