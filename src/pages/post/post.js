import styled from "styled-components";
import { Link } from "react-router-dom";
import { getComments, getPosts } from "../../bff/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Post = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    useEffect(() => {
        getPosts().then((data) => setPosts(data));
    }, []);
    useEffect(() => {
        getComments().then((data) => setComments(data));
    }, []);
    const searchInPosts = () => {
        const filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPosts(filteredPosts);
    };
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <PostPage>
                <h2 className="fa fa-file-text"> Главная</h2>
                <SearchInPosts>
                    <input
                        placeholder="Напишите заголовок статьи, которую хотите найти"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <button
                        className="fa fa-refresh"
                        title="Сбросить поиск"
                        onClick={() => {
                            getPosts().then((data) => setPosts(data));
                            setSearchQuery("");
                        }}
                    ></button>
                    <button
                        className="fa fa-search"
                        title="Поиск"
                        onClick={() => {
                            searchInPosts();
                        }}
                    ></button>
                </SearchInPosts>
                <PostContainer>
                    {currentPosts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <div>
                                <p className="fa fa-comment">
                                    {
                                        comments.filter(
                                            (comment) =>
                                                comment.post_id === post.id
                                        ).length
                                    }
                                </p>
                                <img src={post.image_url} alt="post" />
                                <h2>
                                    {post.title}
                                    <br /> ({post.published_at})
                                </h2>
                            </div>
                        </Link>
                    ))}
                </PostContainer>
                <h3>Странциа: {currentPage}</h3>
            </PostPage>
            <Pagination>
                <button
                    title="Перейти в начало"
                    className="fa fa-arrow-left"
                    onClick={() => paginate(1)}
                ></button>
                {Array.from(
                    { length: Math.ceil(posts.length / postsPerPage) },
                    (_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    )
                )}
                <button
                    title="Перейти в конец"
                    className="fa fa-arrow-right"
                    onClick={() =>
                        paginate(Math.ceil(posts.length / postsPerPage))
                    }
                ></button>
            </Pagination>
        </>
    );
};
const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 0 10px 0;
    button {
        display: flex;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        outline: none;
        border: none;
        text-align-last: center;
        background-image: linear-gradient(to top, #76da81, azure);
        cursor: pointer;
        color: black;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        transition: all 0.5s ease;
        margin: 0 5px 120px 5px;
        &:hover {
            animation: shake 0.5s;
            animation-iteration-count: 1;
        }
    }
`;
const SearchInPosts = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin: 10px 0 10px 0;
    input {
        display: flex;
        width: 500px;
        height: 50px;
        margin: 0 20px 0 0px;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        padding: 0 10px;
        outline: none;
    }
    button {
        display: flex;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        outline: none;
        border: none;
        text-align-last: center;
        background-image: linear-gradient(to top, #76da81, azure);
        cursor: pointer;
        color: black;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        transition: all 0.5s ease;
        margin: 0 5px 0 5px;
        &:hover {
            animation: shake 0.5s;
            animation-iteration-count: 1;
        }
    }
`;
const PostContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin: 0px 20px 0px 20px;
    cursor: pointer;
    width: 95%;
    height: 100%;
    a {
        text-decoration: none;
    }
    div {
        height: 450px;
        background-image: linear-gradient(to top, #76da81, azure);
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        img {
            width: 100%;
            height: 65%;
            object-fit: cover;
        }
        h2 {
            text-align: center;
            color: black;
            font-size: 15px;
        }
        p {
            background-image: linear-gradient(to top, #76da81, azure);
            height: 20px;
            margin: 0px 0px 0px 0px;
            padding: 5px;
            color: black;
            font-size: 15px;
            display: flex;
            border-radius: 10px 10px 0 0px;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
        }
    }
    > *:hover {
        animation: scale 0.2s ease-in forwards;
        @keyframes scale {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(1.1);
            }
        }
    }
`;
const PostPage = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
    margin: 130px 0 20px 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    i {
        width: 100%;
        height: 50px;
        display: flex;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        margin: 0 20px 5px 20px;
        border-radius: 20px;
    }
    h2 {
        max-width: 300px;
        font-size: 30px;
        margin: 20px;
        text-align: center;
        word-wrap: break-word;
    }
`;

PostPage.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        })
    ),
};
