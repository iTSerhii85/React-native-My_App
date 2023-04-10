import { authSlice } from "./authReducer";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../firebase/config";

const auth = getAuth(app);

const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
        }
      );

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      }).then(() => {
        const user = auth.currentUser;
        console.log(user.displayName);
        dispatch(
          authSlice.actions.updateUserProfile({ nickname: user.displayName })
        );
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };
const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export { authSignInUser, authSignOutUser, authSignUpUser, authStateChangeUser };
