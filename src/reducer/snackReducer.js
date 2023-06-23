export const initialValue = {
  snacks: [],
  searchTerm: "",
  sorting: "",
  buttonClicked: ""
};

export const snackReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        snacks: action.payload
      };
    case "SEARCH":
      return {
        ...state,
        searchTerm: action.payload
      };
    case "HIGH_TO_LOW": {
      return {
        ...state,
        sorting: action.payload
      };
    }
    case "LOW_TO_HIGH":
      return {
        ...state,
        sorting: action.payload.order,
        buttonClicked: action.payload.buttonValue
      };
    default:
      console.error("Error in reducer");
  }
};
