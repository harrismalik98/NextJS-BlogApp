import Head from "next/head";
import AllPosts from "../../components/Posts/AllPosts";
import { getAllPosts } from "../../helper/PostsUtil";

const AllPostsPage = (props) => {

    const {posts} = props;

    return(
        <>
            <Head>
                <title>All Posts</title>
                <meta name="description" content="A list of all programming-related posts." />
            </Head>
            <AllPosts posts={posts}/>
        </>
    )
}

export const getStaticProps = () => {
    const allPosts = getAllPosts();

    return{
        props:{
            posts: allPosts,
        },
        revalidate:600, 
    }
}

export default AllPostsPage;