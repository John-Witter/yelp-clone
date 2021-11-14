{
    userReviews && userReviews.map((review, idx) => (
        <div className="user-rat-rev" key={`user-rat-rev ${idx}`}>
            <div className="user-name">
                <img className='yelp-user-photo user-photo' src='https://images.unsplash.com/photo-1547354142-526457358bb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbGhvdWV0dGV8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='profile pic' />{user && review.User.username === user.username ? `Your Review` : review.User.username} <span className='review-time-created'>{review.createdAt.split('T')[0]}</span>
            </div>
            <div className="user-ratings">
                {/* Rating: {userRatings[idx] && userRatings[idx].rating} */}
                {userRatings[idx] && <Stars rating={userRatings[idx].rating} size='small' />}
            </div>
            <div className="user-reviews">
                {review.reviewText && review.reviewText}
            </div>
        </div>
    ))
}

{Object(currentReviews).keys && Object(currentReviews).keys.map((review, idx) => {
    <div className="user-rat-rev" key={`user-rat-rev ${idx}`}>
        <div className="user-name">
            <img src="https://images.unsplash.com/photo-1547354142-526457358bb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbGhvdWV0dGV8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='profile pic" alt="profile pic" className="yelp-user-photo user-photo" /> <span className="review-time-created">{review.createdAt.split('T')[0]}</span>
        </div>
        <div className="user-ratings">
            {currentRatings[idx] && <Stars rating={currentRatings[idx].rating} size='small' />}
        </div>
        <div className="user-reviews">
            {review.reviewText && review.reviewText}
        </div>
    </div>
})





// /*

//  {currentBusiness && <RatingsAndReviews currentBusiness={currentBusiness} currentUser={user} />}
//                     {user && showRatingInput && <Rating id={id} />}
//                     {user && showReviewInput && <Review id={id} />}
//                     {user && console.log('showRatingInput:', showRatingInput, 'showReviewInput:', showReviewInput, 'id:', id)} */
// /* <div className="rat-rev">

//                         {showRatingInput && console.log('showRatingInput:', showRatingInput)}
//                         {!showRatingInput && user.id && console.log('!showRatingInput:', showRatingInput, '(currentRatingsUserIds.includes(user.id)):', (currentRatingsUserIds.includes(user.id)), 'currentRatingsUserIds:', currentRatingsUserIds, 'user:', user, 'userReviews', userReviews, 'currentRatings:', currentRatings, 'currentReviews:', currentReviews)}

//                         {Object.keys(currentRatings).length && console.log('!!!!!!currentRatings:', currentRatings)}

//                         {Object.keys(currentReviews).length && console.log('!!!!!!currentReviews:', currentReviews)}


//                         <RatingsAndReviews currentBusiness={currentBusiness} currentUser={user} />


//                         {Object.keys(currentReviews).length && Object.keys(currentReviews).map((review, idx) => (
//                             <div className="user-rat-rev" key={`user-rat-rev ${idx}`}>
//                                 {console.log('$$$$$$$$review:', currentReviews[review])}
//                                 <div className="user-name">
//                                     <img src="https://images.unsplash.com/photo-1547354142-526457358bb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbGhvdWV0dGV8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='profile pic" alt="profile pic" className="yelp-user-photo user-photo" /> {user.id && currentReviews[review].userId === user.id ? `Your Review`: `USERNAME TODO`} <span className="review-time-created">{currentReviews[review].createdAt.split('T')[0]}</span>
//                                 </div>
//                                 <div className="user-ratings">
//                                     {currentRatings[review] && <Stars rating={currentRatings[review].rating} size='small' />}
//                                 </div>
//                                 <div className="user-reviews">
//                                     {currentReviews[review].reviewText && currentReviews[review].reviewText}
//                                 </div>
//                             </div>                            
//                         ))}


//                         {yelpReviews && yelpReviews.map(review => {
//                             return (
//                                 <div className="yelp-rat-rev" key={review.id}>
//                                     <div className="yelp-review-user">

//                                         <div className="yelp-user-photo-container">
//                                             <img className='yelp-user-photo' src={review.user.image_url} alt={review.user.name} /></div> {review.user.name} <span className='review-time-created'>{review.time_created.split(' ')[0]}</span>
//                                     </div>
//                                     <div className="yelp-rating">

//                                         <Stars rating={review.rating} size='small' />
//                                     </div>
//                                     <div className="yelp-review">
//                                         {review.text}
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div> */ 