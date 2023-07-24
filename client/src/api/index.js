import axios from "axios";
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }return req;
})


//  * User routes
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);
export const sendOtp = () => API.get("/user/sendOtp");
export const verifyUser = (otp) => API.post("/user/verify", { otp });

//  * questions routes
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

//  * questions routes for admin access
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

//  * general routes
export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

// * chat routes
export const postChat = (promptValue) =>
  API.post("/chat/add", { message: promptValue });
export const getChat = () => API.get("/chat/get");

// * social routes
export const getPosts = () => API.get("/social/post/all");
export const getUserPosts = (id) => API.get(`/social/post/userPosts/${id}`);
export const getPostById = (id) => API.get(`/social/post/${id}`);
export const addPost = (description, url) =>
  API.post("/social/post/create", { description, url });

export const likePost = (id) => API.patch(`/social/post/like/${id}`);
export const unlikePost = (id) => API.patch(`/social/post/unlike/${id}`);
export const deletePost = (id) => API.delete(`/social/post/${id}`);

export const follow = (id) => API.post(`/user/follow`, { id: id });
export const unfollow = (id) => API.post(`/user/unfollow`, { id: id });

// * subscription routes
export const order = (amount) => API.post("/subscription/order", { amount });
export const verifyOrder = (id, amount, response) =>
  API.post("/subscription/is-order-complete", { id, amount, response });
export const checkSubs = (userId) =>
  API.get(`/subscription/check-subscription/${userId}`);
