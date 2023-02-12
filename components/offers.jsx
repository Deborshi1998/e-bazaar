import React from 'react'
import styles from '../styles/Offers.module.css'
import {offers} from '../assets/info'
import OfferCard from './offerCard'

function Offers() {
  return (
    <div className={styles.offers}>
        <div className={styles.offers_top}>
            <div>
                <span> What specials do we offer?</span>
            </div>
        </div>
        <div className={styles.offers_cards}>
            {offers.map((offer, index) => {
                return (
                  <OfferCard
                    key={index}
                    header={offer.title}
                    info={offer.description}
                    imageSrc={offer.image}
                  />
                );
            })}
        </div>
    </div>
  )
}

export default Offers