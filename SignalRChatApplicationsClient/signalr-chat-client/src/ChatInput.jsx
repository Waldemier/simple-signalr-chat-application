import React from 'react'

export default function ChatInput(props) {

    const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");

    const onSubmit = e => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        }
        else {
            alert("Please, insert an user and a message.");
        }

    }

    const onUserUpdate = e => {
        setUser(e.target.value);
    }

    const onMessageUpdate = e => {
        setMessage(e.target.value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="user">User:</label>
                <br />
                <input id="user" name="user" value={user} onChange={onUserUpdate} />
                <br />
                <label htmlFor="message">Message:</label>
                <br />
                <input type="text" id="message" name="message" value={message} onChange={onMessageUpdate} />
                <br />
                <br />
                <button>Submit</button>
            </form>
        </div>
    )
}
