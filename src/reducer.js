const reducer = (state = [], action) => {
  if (action.type === "CITY") {
    const { data } = action.payload;
    return { ...data };
  }

  return state;
};

export default reducer;
