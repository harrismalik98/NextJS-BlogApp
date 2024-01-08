import Head from "next/head";
import PostContent from "../../components/Posts/Post-Detail/PostContent";
import { getAllPosts, getPostData } from "../../helper/PostsUtil";

const SinglePostPage = (props) => {

    const {post} = props;

    return(
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostContent post={post}/>
        </>
    )
}

export const getStaticProps = (context) => {

    const {slug} = context.params;

    const post = getPostData(slug);

    return{
        props:{
            post: post,
        },
        revalidate:600,
    }
}

export const getStaticPaths = () => {

    const allPosts = getAllPosts();

    const paths = allPosts.map((post => (
        {params: {slug: post.slug}}
    )));

    return{
        // paths: [{params: {slug: 'getting-started-with-NextJS'}}]
        paths:paths,
        fallback:false,
    }
}

export default SinglePostPage;