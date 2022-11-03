import React from "react";
import AddItemButton from "./AddItemButton";
import Card from "./Card";
import EmptyList from "../assets/empty-list.svg";

const CardsList = ({ filteredItems, route, searchValue, count }) => {
  return (
    <>
      <div className="password-grid padding-side standard-stack">
        <div className="scroll-view">
          <span className="count">{count} Items</span>
          <div className="contents" style={{height: count === 0 ? "100%" : "auto"}}>
            {filteredItems.length === 0 && (
              <div className="empty-list">
                <img src={EmptyList} alt={EmptyList}></img>
                <p>
                  {searchValue === "" ? (
                    <>
                      You havent added<br></br>any item yet
                    </>
                  ) : (
                    <>No items Found</>
                  )}
                </p>
              </div>
            )}
            {filteredItems.map((item, idx) => (
              <Card key={idx} route={route} item={item}></Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsList;
