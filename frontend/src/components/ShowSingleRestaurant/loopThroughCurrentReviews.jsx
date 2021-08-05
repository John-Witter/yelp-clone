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
})}