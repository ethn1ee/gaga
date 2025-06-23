import {
  signInInput,
  type SignInInput,
  signUpInput,
  type SignUpInput,
} from "./auth";
import { commentInput, type CommentInput } from "./comment";
import { postInput, type PostInput, type PostWithComments } from "./post";

export { commentInput, postInput, signInInput, signUpInput };
export type {
  CommentInput,
  PostInput,
  PostWithComments,
  SignInInput,
  SignUpInput,
};
