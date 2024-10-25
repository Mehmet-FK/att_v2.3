import Link from "next/link";
const Card = ({ cardInfo }) => {
  return (
    <Link
      href={{
        pathname: cardInfo.url,
      }}
    >
      <div className="dc_card">
        <div className={"dc_cardBody"}>
          <h5 className={"dc_cardTitle"}>{cardInfo?.caption}</h5>

          <img
            src={cardInfo?.defaultIconUrl}
            className={"dc_cardIcon"}
            alt="icon"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
