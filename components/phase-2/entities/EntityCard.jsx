import Link from "next/link";
import css from "./entities-comp.module.css";
const EntityCard = ({ cardInfo }) => {
  return (
    // <Link href={`/entities/add/${cardInfo.id}`}>
    <Link
      href={{
        pathname: `/entities/add`,
        query: { entityId: cardInfo.id },
      }}
    >
      <div className={css.card}>
        <div className={css.cardBody}>
          <h5 className={css.cardTitle}>{cardInfo?.caption}</h5>

          <img
            src={cardInfo?.defaultIconUrl || "/assets/no-img.jpg"}
            className={css.cardIcon}
            alt="icon"
          />

          <h6 className={css.cardSubtitle}>{cardInfo?.dataSource}</h6>

          <span className={css.createdDate}>{cardInfo.createDate}</span>

          {/* <span className={styles.createdBy}>{cardInfo.createdBy}</span> */}
        </div>
      </div>
    </Link>
  );
};

export default EntityCard;
