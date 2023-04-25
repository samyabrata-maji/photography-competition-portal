import type { User } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { firestore } from "./init";
import useToasts from "../hooks/useToast";

export const createUser = async (user: User) => {
    const docRef = doc(firestore, "user", user.uid);
    setDoc(
        docRef,
        {
            email: user.email,
            name: user.displayName,
            isVerified: user.emailVerified,
        },
        { merge: true }
    ).then(() => {
        console.log("Successfully added entries");
    });
};

/* use this if you know a user already exists */
const updateUser = async (user: User) => {
    console.log("updating user into firebase...");

    const docRef = doc(firestore, "user", user.uid);
    setDoc(
        docRef,
        {
            email: user.uid,
            name: user.displayName,
            dateUpdated: Timestamp.now(),
        },
        { merge: true }
    );
};

export const readUser = () => {};

export const deleteUser = () => {};

export const registerUser = (
    user: User,
    regNo: number,
    regEmail: string,
    regName: string
) => {
    const docRef = doc(firestore, "user", user.uid);
    const { successToast } = useToasts();

    setDoc(docRef, { regEmail, regName, regNo }, { merge: true }).then(() => {
        successToast("Successfully registered 🤝");
    });
};
