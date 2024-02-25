import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const Listing = () => {
    const { listingId } = useParams();
    const [listingData, setListingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListingData = async () => {
            try {
                const res = await fetch(`/api/listing/getlisting/${listingId}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch listing data");
                }
                const data = await res.json();
                setListingData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchListingData();
    }, [listingId]);
    
    console.log(listingData);

    
    return (
        <div>
            <div>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div>
                        <h2>{"Jai Hind"}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Listing;
