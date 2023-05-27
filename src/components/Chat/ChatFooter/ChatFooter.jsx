import React from 'react';

function ChatFooter({ roomName, onSubmit, values, onChange }) {
  return (
    <div className="chat_footer">
      <button className="chat_header_icon chat_header_icon-face" />
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Type a message" name="message" value={values.message} onChange={onChange} minLength="1" maxLength="100" disabled={!roomName?.chatId} />
        <button type="submit">Send</button>
      </form>
      <button className="chat_header_icon chat_header_icon-mic" />
    </div>
  );
}

export default ChatFooter;
