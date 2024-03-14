import Link from "next/link";
import styles from "./entities-comp.module.css";
const EntityCard = ({ cardInfo }) => {
  return (
    // <Link href={`/entities/add/${cardInfo.id}`}>
    <Link
      href={{
        pathname: `/entities/add`,
        query: { entityId: cardInfo.id },
      }}
    >
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{cardInfo?.caption}</h5>

          <img
            src={cardInfo?.defaultIconUrl}
            className={styles.cardIcon}
            alt="icon"
          />

          <h6 className={styles.cardSubtitle}>{cardInfo?.dataSource}</h6>

          <span className={styles.createdDate}>{cardInfo.createDate}</span>

          {/* <span className={styles.createdBy}>{cardInfo.createdBy}</span> */}
        </div>
      </div>
    </Link>
  );
};

export default EntityCard;
