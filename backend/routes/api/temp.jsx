


{
    user && <div className="user-rat-rev">
        <div className="user-name">
            {user.username}
        </div>
        {userRatings[0] && (
            <div className="user-ratings">
                Rating: {userRatings[0].rating}
            </div>
        )}
        {userReviews[0] && (
            <div className="user-reviews">
                {userReviews[0].reviewText}
            </div>
        )}
    </div>
}