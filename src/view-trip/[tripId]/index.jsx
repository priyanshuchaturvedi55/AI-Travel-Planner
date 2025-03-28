import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../components/services/firebaseConfig';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner'; 
import InfoSection from '../components/infoSection';

const TripId = () => {
    const { tripid } = useParams();
    const [trip, setTrip] = useState({}); // ✅ Changed from [] to {}

    useEffect(() => {
        console.log("Trip ID from URL:", tripid); // ✅ Debugging log
        if (tripid) {
            GetTripData();
        }
    }, [tripid]);

    const GetTripData = async () => {
        try {
            const docRef = doc(db, "AITRIPPLANNER", tripid); 
            console.log("Fetching document:", tripid); // ✅ Debugging log
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setTrip(docSnap.data());
            } else {
                console.log("No Such Document!");
                toast("No trip found with this ID");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {trip ? <InfoSection trip={trip}/> : <p>Loading trip details...</p>}
        </div>
    );
};

export default TripId;
