import Head from "next/head";
import ContactForm from "../components/Contact/ContactForm";

const ContactPage = () => {
    return(
        <>
            <Head>
                <title>Contact Me</title>
            </Head>
            <ContactForm />
        </>
    )
}

export default ContactPage;