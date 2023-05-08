import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { COLORS } from "../constants";
import { auth, database } from "../config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const handleSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => handleSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
      messagesContainerStyle={{ backgroundColor: COLORS.lightSpearmint }}
      renderUsernameOnMessage={true}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: COLORS.primary,
              },
              left: {
                color: COLORS.primary,
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.white,
              },
              right: {
                backgroundColor: COLORS.white,
              },
            }}
          />
        );
      }}
    />
  );
}

export default Chat;
