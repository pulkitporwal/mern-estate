import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ContactToLandlord = ({ listingData }) => {
	const [message, setMessage] = useState("");
    const [landlordInformation, setLandlordInformation] = useState({});

    console.log((listingData));
    useEffect(()=>{
        const fetchLandlord = async () => {
            try {
              const res = await fetch(`/api/user/getlandlord/${listingData.listingData.userRef}`);
              const data = await res.json();
              setLandlordInformation(data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchLandlord();
    })

	return (
		<div className="flex items-center justify-center flex-col">
			<textarea
				name="message"
				id="message"
				value={message}
				onChange={(e) => {
					setMessage(e.target.value);
				}}
				className="w-[385px] sm:w-[1190px] mx-auto p-6 rounded-xl border-[0.5px]"
				rows="4"
				placeholder="Enter your Message..."
			></textarea>
			<Link
				to={`mailto:${landlordInformation.email}?subject=Regarding ${listingData.listingData.name}&body=${message}`}
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
			>
				Send Message
			</Link>
		</div>
	);
};

export default ContactToLandlord;
