import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPosts } from "../../bff/api";
import { useEffect, useState } from "react";

export const Post = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        getPosts().then((data) => setPosts(data));
    }, []);

    const searchInPosts = () => {
        const filteredPosts = posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPosts(filteredPosts);
    };

    return (
        <PostPage>
            <h2>
                <i className="fa fa-file-text"> &nbsp;Статьи</i>
            </h2>
            <SearchInPosts>
                <input
                    placeholder="Напишите заголовок статьи, которую хотите найти"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
                <h
                    className="fa fa-refresh"
                    title="Сбросить поиск"
                    onClick={() => {
                        getPosts().then((data) => setPosts(data));
                        setSearchQuery("");
                    }}
                ></h>
                <h
                    className="fa fa-search"
                    title="Сбросить поиск"
                    onClick={() => {
                        searchInPosts();
                        setSearchQuery("");
                    }}
                ></h>
            </SearchInPosts>
            <PostContainer>
                {posts.map((post, index) => (
                    <Link to={`/post/${post.id}`}>
                        <div key={index}>
                            <p>{post.published_at}</p>
                            <img src={post.image_url} alt="post" />
                            <h2>{post.title}</h2>
                        </div>
                    </Link>
                ))}
            </PostContainer>
        </PostPage>
    );
};
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
    h {
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
            background-image: linear-gradient(to top, yellow, yellow);
            transform: scale(1.05);
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
            height: 80px;
            margin: 10px;
            color: black;
            font-size: 20px;
        }
        p {
            margin: 0;
            text-align: center;
            color: black;
            font-size: 20px;
            background-image: linear-gradient(to top, #76da81, azure);
            border-radius: 10px 10px 0px 0px;
        }
    }
    > *:hover {
        animation: scale 0.5s forwards;
        @keyframes scale {
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(1.05);
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
    margin: 120px 0 120px 0;
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
        font-size: 30px;

        margin: 0;
    }
`;
