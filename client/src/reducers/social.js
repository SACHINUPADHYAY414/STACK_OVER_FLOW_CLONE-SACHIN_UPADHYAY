const socialReducer = (states = {}, action) => {
  switch (action.type) {
    case "SOCIAL_START_LOADING":
      return { ...states, isLoading: true };
    case "SOCIAL_END_LOADING":
      return { ...states, isLoading: false };
    case "SET_POSTS":
      return { isLoading: false, posts: action.payload.posts };
    default:
      return states;
  }
};

export default socialReducer;

// ? postBy schema
// * postBy : {
// *   name:String,
// *   _id:string
// * }

/**
 * ? POST schema
 * * {
 * * postBy: string -> userID,
 * * url: string,
 * * totalLikes: number,
 * * likes: string[] -> userIds,
 * * description:  String,
 * * }
 * */

/**
 * ? State Schema
 * * {
 * * loading: boolean,
 * * posts:[]
 * * }
 * */
