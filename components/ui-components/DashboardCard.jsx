import Link from "next/link";
import css from "@/styles/dashboard-card.module.css";

const Card = ({ cardInfo }) => {
  const iconUrl = cardInfo.defaultIconUrl
    ? cardInfo.defaultIconUrl
    : "/assets/dashboard-icons/default-card-icon.svg";
  return (
    <Link
      href={{
        pathname: cardInfo.url,
      }}
    >
      <div className={css.card}>
        <div className={css.cardBody}>
          <h5 className={css.cardTitle}>{cardInfo?.caption}</h5>

          <img src={iconUrl} className={css.cardIcon} alt="icon" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
