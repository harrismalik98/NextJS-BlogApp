import Head from "next/head";
import FeaturedPosts from "../components/HomePage/FeaturedPosts";
import Hero from "../components/HomePage/Hero";
import { getFeaturedPosts } from "../helper/PostsUtil";

const HomePage = (props) => {

    const {featuredPosts} = props
    return(
        <>
            <Head>
                <title>Harris Blogs</title>
                <meta name="description" content="A full stack developer who shares insights on web development through blogs." />
            </Head>
            <Hero/>
            <FeaturedPosts posts={featuredPosts} /> 
        </>
    )
}

export const getStaticProps = () => {

    const featuredPosts = getFeaturedPosts();

    return{
        props: {
            featuredPosts: featuredPosts,
        },
        revalidate:600,
    }

}

export default HomePage;