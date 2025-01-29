import Link from "next/link";
import css from "@/styles/dashboard-styles/dashboard-card.module.css";

const Card = ({ cardInfo, additionalTitles }) => {
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
            <h5 className={css.cardTitle}>{cardInfo?.caption}</h5>
            {additionalTitles?.map((title) => (
              <h6 className={css.additional_card_itle}>{title}</h6>
            ))}
            <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
              {cardInfo?.texts?.map((text) => (
                <p className={css.card_helper_text}>{text} </p>
              ))}
            </div>
          </div>

          <img src={iconUrl} className={css.cardIcon} alt="icon" />
        </div>
      </div>
    </Link>
  );
};

export default Card;
