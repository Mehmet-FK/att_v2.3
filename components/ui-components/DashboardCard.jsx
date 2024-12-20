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
        <div className={css.card_body}>
          <div className={css.card_title_wrapper}>
            <p className={css.card_helper_text}>{cardInfo?.path}</p>
            <h5 className={css.cardTitle}>{cardInfo?.caption}</h5>
          </div>

          <img src={iconUrl} className={css.cardIcon} alt="icon" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
