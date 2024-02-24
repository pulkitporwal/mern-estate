import React from 'react'
import { useParams } from 'react-router-dom'

const Listing = () => {
	const {listingId} = useParams();
  return (
	<div>
	  <p>{listingId}</p>
	</div>
  )
}

export default Listing
