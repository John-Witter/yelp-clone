// import {stars} from '../../../public/yelp_stars/web_and_ios/regular'
// import {stars} from '../../../public/yelp_stars/web_and_ios/regular'
import star_0 from './regular_0.png'
import star_1 from './regular_1.png'
import star_1_half from './regular_1_half.png'
import star_2 from './regular_2.png'
import star_2_half from './regular_2_half.png'
import star_3 from './regular_3.png'
import star_3_half from './regular_3_half.png'
import star_4 from './regular_4.png'
import star_4_half from './regular_4_half.png'
import star_5 from './regular_5.png'
import './Stars.css'

const starRatings = {
    0 : star_0,
    1 : star_1,
    1.5 : star_1_half,
    2 : star_2,
    2.5 : star_2_half,
    3 : star_3,
    3.5 : star_3_half,
    4 : star_4,
    4.5 : star_4_half,
    5 : star_5
}

export default function Stars({ rating, size }) {
    const starSource = starRatings[rating]
    console.log('starSource', starSource)
    return (
        <img src={starSource} alt={`star-${rating}`} className={`rating-star-${size}`} />
        // <div className="stars">
        //     <div>
        //         <img src={star_0} alt="" />
        //     </div>
        //     <div>
        //         <img src={star_1} alt="" />
        //     </div>

        //     <div>
        //         <img src={star_1_half} alt="" />
        //     </div>
        //     <div>
        //         <img src={star_2} alt="" />
        //     </div>
        //     <div>
        //         <img src={star_2_half} alt="" />
        //     </div>

        //     <div>
        //         <img src={star_3} alt="" />
        //     </div>
        //     <div>
        //         <img src={star_3_half} alt="" />
        //     </div>

        //     <div>
        //         <img src={star_4} alt="" />
        //     </div>
        //     <div>
        //         <img src={star_4_half} alt="" />
        //     </div>

        //     <div>
        //         <img src={star_5} alt="" />
        //     </div>

        // </div>

    )
}
