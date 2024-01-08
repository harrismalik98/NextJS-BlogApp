import { insertDocument } from "../../helper/DatabseUtil";

const contact = async(req, res) => {
    if(req.method === "POST")
    {
        const {name, email, message} = req.body;

        if(!name || name.trim() ==="" || !email || !email.includes('@') || !message || message.trim() === "" )
        {
            return res.status(422).json({message: "Invalid input."})
        }

        const newMessage = {
            name, email, message
        }

        try
        {
            const result = await insertDocument("messages", newMessage);
            newMessage.id = result.insertedId;
            return res.status(201).json({message: "Successfully sent message!"});
        }
        catch(error)
        {
            return res.status(500).json({message: error.message || "Failed to send message!"});
        }
    }
}

export default contact;