import React, { useEffect } from "react";
import { AlertMessageStyle, MessagesContainer } from "./alert-message.style";
import { getMessages, removeMessage } from "../../actions/message";
import { connect } from "react-redux";

const AlertMessages = ({ messages, removeMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      messages.forEach((_msg, idx) => {
        return removeMessage(idx);
      });
    }, 5000);
  }, [messages, removeMessage]);

  return (
    <MessagesContainer>
      {messages.map((msg, idx) => {
        return (
          <AlertMessageStyle
            key={idx}
            title="Click to dismiss"
            id="alert-message"
            onClick={() => removeMessage(idx)}
            className={msg && "active"}
          >
            {msg}
          </AlertMessageStyle>
        );
      })}
    </MessagesContainer>
  );
};

const mapStateToProps = (state) => ({
  messages: state.message.messages,
});

export default connect(mapStateToProps, { getMessages, removeMessage })(
  AlertMessages
);
