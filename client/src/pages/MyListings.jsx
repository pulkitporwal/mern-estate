import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSquareParking } from "react-icons/fa6";
import {
  MdOutlineBedroomParent,
  MdSell,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const MyListings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [myListingData, setMyListingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching listings...");
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `/api/user/mylistings/${currentUser.userData._id}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await res.json();
        console.log("Listings data:", data); // Log the received data
        if (data && data.listingsArray) {
          setMyListingData(data.listingsArray);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchListings();
    }
  }, [currentUser]);

  const navigate = useNavigate();

  const openListing = (listingId) => {
    navigate(`/listing/${listingId}`);
  };

  const deleteListing = async (listingId) => {
    const areYouSure = window.confirm(
      "Are you Sure you want to delete the Listing"
    );

    if (areYouSure) {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          toast.success(data.message || "Listing deleted successfully");
          navigate("/my-listings");
        } else {
          throw new Error(data.message || "Failed to delete listing");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete listing");
      }
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const updateListing = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">My Listings</h1>
        <section className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myListingData.map((listing) => (
            <div key={listing._id} className="relative">
              <div className="absolute z-20 flex gap-3 top-5 text-red-700 right-5">
                <div className="bg-white rounded-lg cursor-pointer p-[2px]">
                  <MdEdit
                    onClick={() => updateListing(listing._id)}
                    size={"25px"}
                  />
                </div>
                <div className="bg-white rounded-lg cursor-pointer p-[2px]">
                  <MdDelete
                    onClick={() => deleteListing(listing._id)}
                    size={"25px"}
                  />
                </div>
              </div>
              <div
                onClick={() => openListing(listing._id)}
                key={listing._id}
                className="cursor-pointer bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="Product"
                  className="object-cover w-full object-center rounded-t-xl h-44"
                />
                <div className="px-4 py-3">
                  <p className="text-lg font-bold text-black truncate capitalize">
                    {listing.name}
                  </p>
                  <div className="text-gray-400 mr-3 h-24 text-center py-3 uppercase text-xs">
                    {listing.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-black my-3">
                      ₹ {listing.regularPrice}
                    </p>
                    <p className="text-sm text-red-600 ml-2">
                      {listing.discountedPrice
                        ? `- ₹${listing.discountedPrice}`
                        : ""}
                    </p>
                    <div className="ml-3 flex items-center gap-1">
                      {listing.parking && (
                        <FaSquareParking size={"25px"} color="green" />
                      )}
                      {listing.rent ? (
                        <MdOutlineBedroomParent size={"25px"} color="blue" />
                      ) : (
                        <MdSell size={"25px"} color="red" />
                      )}
                      {listing.offer && (
                        <BiSolidOffer size={"25px"} color="#10B981" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Toaster />
    </div>
  );
};

export default MyListings;
