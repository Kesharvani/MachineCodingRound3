import { useState } from "react";
import "./Table.css";
import { useSnack } from "../context/Snackprovider";
export const Table = () => {
  const [sortValue, setSortValue] = useState("");
  const { state, dispatch } = useSnack();

  const onChangeHandler = (e) => {
    dispatch({ type: "SEARCH", payload: e.target.value });
  };
  const searchFilter = state.snacks.filter(
    (item) =>
      item.product_name.includes(state.searchTerm) ||
      item.ingredients.includes(state.searchTerm)
  );

  const btnHandler = (e) => {
    if (sortValue === "LOW_TO_HIGH") {
      dispatch({
        type: "LOW_TO_HIGH",
        payload: { order: "LOW_TO_HIGH", buttonValue: e.target.value }
      });
      setSortValue("HIGH_TO_LOW");
    } else {
      dispatch({
        type: "HIGH_TO_LOW",
        payload: { order: "HIGH_TO_LOW", buttonValue: e.target.value }
      });
      setSortValue("LOW_TO_HIGH");
    }
  };
  const sortedDataById =
    state.buttonClicked === "id"
      ? state.sorting === "LOW_TO_HIGH"
        ? [...searchFilter].sort((p1, p2) => p1.id - p2.id)
        : [...searchFilter].sort((p1, p2) => p2.id - p1.id)
      : [...searchFilter];

  const sortedDataByProductName =
    state.buttonClicked === "product_Name"
      ? state.sorting === "LOW_TO_HIGH"
        ? [...sortedDataById].sort(
            (p1, p2) => p1.product_name - p2.product_name
          )
        : [...sortedDataById].sort(
            (p1, p2) => p2.product_name - p1.product_name
          )
      : [...sortedDataById];

  const sortedDataByProductWeight =
    state.buttonClicked === "product_weight"
      ? state.sorting === "LOW_TO_HIGH"
        ? [...sortedDataByProductName].sort(
            (p1, p2) =>
              p1.product_weight.split("g")[0] - p2.product_weight.split("g")[0]
          )
        : [...sortedDataByProductName].sort(
            (p1, p2) =>
              p2.product_weight.split("g")[0] - p1.product_weight.split("g")[0]
          )
      : [...sortedDataByProductName];

  const sortedDataByProductPrice =
    state.buttonClicked === "price"
      ? state.sorting === "LOW_TO_HIGH"
        ? [...sortedDataByProductWeight].sort((p1, p2) => p1.price - p2.price)
        : [...sortedDataByProductWeight].sort((p1, p2) => p2.price - p1.price)
      : [...sortedDataByProductWeight];

  const sortedDataByProductCalories =
    state.buttonClicked === "Calories"
      ? state.sorting === "LOW_TO_HIGH"
        ? [...sortedDataByProductPrice].sort(
            (p1, p2) => p1.calories - p2.calories
          )
        : [...sortedDataByProductPrice].sort(
            (p1, p2) => p2.calories - p1.calories
          )
      : [...sortedDataByProductPrice];
  return (
    <div>
      <input
        type="text"
        placeholder="Search by header"
        onChange={onChangeHandler}
        className="search"
      />

      <div className="table_wrapper header_wrapper">
        <div>
          <button value="id" onClick={btnHandler}>
            Id
          </button>
        </div>
        <div>
          <button value="product_Name" onClick={btnHandler}>
            Product Name
          </button>
        </div>
        <div>
          <button value="product_weight" onClick={btnHandler}>
            Product Weight
          </button>
        </div>
        <div>
          <button value="price" onClick={btnHandler}>
            Price
          </button>
        </div>
        <div>
          <button value="Calories" onClick={btnHandler}>
            Calories
          </button>
        </div>
        <div>
          <button value="Ingredients" onClick={btnHandler}>
            Ingredients
          </button>
        </div>
      </div>

      {sortedDataByProductCalories.map((item) => {
        return (
          <div key={item.id}>
            <div className="table_wrapper">
              <div>{item.id}</div>
              <div>{item.product_name}</div>
              <div>{item.product_weight}</div>
              <div>{item.price}</div>
              <div>{item.calories}</div>
              <div className="ingredient">{item.ingredients}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
