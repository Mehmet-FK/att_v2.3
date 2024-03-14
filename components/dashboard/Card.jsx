import styles from "./dashboard-card.module.css";
import Link from "next/link";

const ModuleButton = ({ btnInfo }) => {
  return (
    <Link href={btnInfo.href} className={styles.link}>
      <div
        className={styles.moduleBtn}
        style={{ backgroundColor: btnInfo.color }}
      >
        <img className={styles.icon} src={btnInfo.icon} />
        <p>{btnInfo.name}</p>
      </div>
    </Link>
  );
};

const Card = ({ cardInfo }) => {
  return (
    <>
      <div className={styles.card}>
        <div
          className={`${styles.card} ${styles.bgImg}`}
          style={{ backgroundImage: `url(${cardInfo.img}) ` }}
        ></div>
        <div className={styles.infoWrapper}>
          <h3 className={styles.title}>{cardInfo.groupTitle}</h3>
          <p>{cardInfo.groupTitle}</p>
        </div>
        <div className={`${styles.card} ${styles.modulesWrapper}`}>
          <div className={styles.btnWrapper}>
            {cardInfo.subModules.map((btn) => (
              <ModuleButton btnInfo={btn} key={btn.href} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
