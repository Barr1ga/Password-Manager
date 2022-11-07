import React from "react";
import Item from "./Item";
import EmptyList from "../../assets/empty-list.svg";

const ItemsList = ({ filteredItems, route, searchValue, count }) => {
  return (
    <>
      <div className="password-list standard-stack">
        <div className="scroll-view">
          <span className="padding-side count">{count} Items</span>
          <div className="contents" style={{height: count === 0 ? "100%" : "auto"}}>
            {filteredItems.length === 0 && (
              <div className="empty-list">
                <img src={EmptyList} alt={EmptyList}></img>
                <span>
                  {searchValue === "" ? (
                    <>
                      You havent added<br></br>any item yet
                    </>
                  ) : (
                    <>No items Found</>
                  )}
                </span>
              </div>
            )}
            {filteredItems.map((item, idx) => (
              <Item key={idx} route={route} item={item}></Item>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsList;
