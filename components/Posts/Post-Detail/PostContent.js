import PostHeader from "./PostHeader";
import classes from "./PostContent.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/legacy/image";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("jsx", jsx);

const PostContent = (props) => { 

    const {post} = props;

    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customComponents = {
        // img(image) {
        //     return(
        //         <Image src={`/images/posts/${post.slug}/${image.src}`} alt={image.alt} width={600} height={300} />
        //     )
        // },

        p(paragraph){
            const {node} = paragraph;

            if(node.children[0].tagName === 'img')
            {
                const image = node.children[0];

                return(
                    <div className={classes.image}>
                        <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.properties.alt} width={600} height={300} />
                    </div>
                );
            }

            return(
                <p>{paragraph.children}</p>
            )
        },

        code(code) {
            const { className, children } = code;
            const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
            return (
                <SyntaxHighlighter
                style={atomDark}
                language={language}
                children={children}
              />
            );
        },
    }

    return(
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath}/>
            <ReactMarkdown components={customComponents}>{post.content}</ReactMarkdown>
        </article>
    )
}

export default PostContent;