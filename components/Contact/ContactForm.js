import { useEffect, useState } from "react";
import classes from "./ContactForm.module.css";
import axios from "axios";
import Notification from "../UI/Notification";


const ContactForm = () => {

    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredMessage, setEnteredMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(()=> {
        if(requestStatus === "success" || requestStatus === "error")
        {
            const timer = setTimeout(()=> {
                setRequestStatus(null);
                setRequestError(null);
            }, 2000);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [requestStatus]);

    const sendEmailHandler = async(event) => {
        event.preventDefault()

        const newMessage = {
            name: enteredName,
            email: enteredEmail,    
            message: enteredMessage
        }

        setRequestStatus("pending");

        try
        {
            const {data} = await axios.post("/api/contact", newMessage);  
            setRequestStatus("success");

            setEnteredName("");
            setEnteredEmail("");
            setEnteredMessage("");
        }
        catch(error)
        {
            setRequestStatus("error");
            setRequestError(error.message);
        }

    }


    let notification;

    if(requestStatus === "pending")
    {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way!"
        }
    }
    
    if(requestStatus === "success")
    {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!"
        }
    }

    if(requestStatus === "error")
    {
        notification = {
            status: "error",
            title: "Error!",
            message: requestError,
        }
    }



    return(
        <section className={classes.contact}>
            <h1>How can i help you?</h1>
            <form className={classes.form} onSubmit={sendEmailHandler}>
                <div className={classes.controls}>
                <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" required value={enteredName} onChange={(event)=> setEnteredName(event.target.value)}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" required value={enteredEmail} onChange={(event)=> setEnteredEmail(event.target.value)} />
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" row="5" required value={enteredMessage} onChange={(event)=> setEnteredMessage(event.target.value)}></textarea>
                </div>

                <div className={classes.action}>
                    <button>Send Messsage</button>
                </div>
            </form>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </section>
    )
}

export default ContactForm;