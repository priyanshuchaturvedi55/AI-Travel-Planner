import React, { useEffect, useRef, useState } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Input } from "postcss";
import { Button } from "../components/ui/button";
import { SelectBudgetOptions, SelectTravelsList } from "../constants/option";
import { toast } from "sonner"

// Define libraries array outside the component
const libraries = ["places"];

function CreateTrip() {
  const [place, setPlace] = useState("");
  const searchBoxRef = useRef(null);
  const [formData, setFormData] = useState({});

  const handlePlaceChanged = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
      
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  
  const OnGenerateTrip = () => {
    if(formData?.["no.of.days"] > 5 || ! formData?.location || !formData?.budget || !formData?.traveler){
      toast("please fill all the details");
      return;
    }
    console.log(formData);
  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        "Just provide some details, and we'll craft a personalized travel
        itinerary for you effortlessly."
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-2 font-medium">
            What is your destination of choice?
          </h2>

          {/* Load Google Maps API */}
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            libraries={libraries}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={() => {
                if(!searchBoxRef.current) return;
                const places = searchBoxRef.current.getPlaces();
                if(!places || places.length === 0) return;
                  const selectedPlace = places[0].formatted_address;
                  setPlace(selectedPlace);
                  handlePlaceChanged("location", selectedPlace);
                
              }}
            >
              <input
                type="text"
                placeholder="Enter a destination"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </StandaloneSearchBox>
          </LoadScript>

          {/* Display selected place */}
          {place && (
            <p className="mt-2 text-lg text-gray-700">Selected: {place}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl my-2 font-medium">
            how many days are you planning for trip?
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handlePlaceChanged("no.of.days",e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-2 font-medium">
          What is your budget for the trip?
          {/* The budget is exclusively allocated for activities and dining purposes. */}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handlePlaceChanged("budget", item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${formData?.budget==item.title && 'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-2 font-medium">
          Who do you plan on traveling with on your next adventure?
          {/* The budget is exclusively allocated for activities and dining purposes. */}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handlePlaceChanged("traveler", item.people)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${formData?.traveler==item.people && 'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
