import css from "@/styles/dashboard-card.module.css";
import Link from "next/link";
const Card = ({ cardInfo }) => {
  return (
    <Link
      href={{
        pathname: cardInfo.url,
      }}
    >
      <div className={css.card}>
        <div className={css.cardBody}>
          <h5 className={css.cardTitle}>{cardInfo?.caption}</h5>

          <img
            src={cardInfo?.defaultIconUrl}
            className={css.cardIcon}
            alt="icon"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
