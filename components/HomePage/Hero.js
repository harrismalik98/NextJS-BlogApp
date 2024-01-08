import Image from "next/legacy/image";
import classes from "./Hero.module.css";

const Hero = () => {
    return(
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/profile-pic.png" alt="Muhammad Harris Profile Picture" priority={true} width={300} height={300}/>
            </div>
            <h1>Hi, I'm Muhammad Harris</h1>
            <p>I'm a passionate full stack developer who shares insights on cutting-edge web development through my blogs.</p>
        </section>
    )
}

export default Hero;