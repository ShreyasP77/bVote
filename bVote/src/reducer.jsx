
const reducer = (state, action) => {
    if (action.type === "HOME_UPDATE") {
      return {
        ...state,
        name: action.payload.name,
        image: action.payload.image,
        content: action.payload.content,
        btnLink:action.payload.btnLink,
        btnContent:action.payload.btnContent,
      };
    }
  
    if (action.type === "ABOUT_UPDATE") {
      return {
        ...state,
        name: action.payload.name,
        image: action.payload.image,
        content: action.payload.content,
        btnLink:action.payload.btnLink,
        btnContent:action.payload.btnContent,
      };
    }
  
    if (action.type === "GET_RESULTS") {
      return {
        ...state,
        results: action.payload,
      };
    }
    if (action.type === "GET_ETHDATA") {
      return {
        ...state,
        contractInfo: action.payload.contractInfo,
      };
    }
    return state;
  };
  
  export default reducer;