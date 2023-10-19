import { useState } from "react";

function Header({title}) {
    return <h1>{title ? title : 'Default Title'}</h1>;
}

function HomePage() {
    const names = [ "Ada Lovelace", "Alan Turing", "Larry Page" ];
    const [ likes, setLikes ] = useState(0);

    function handleLikeClick() {
        setLikes(likes + 1);
    }

    return (
        <div>
            <Header title={"Keep Learning! Keep Building! Keep Shipping! 👷 🏫 🚢"}/>
            <Header title={"React 💙"}/>
            <ul>
                {names.map(name => (
                    <li key={name}>{name}</li>
                ))}
            </ul>

            <button onClick={handleLikeClick}>Like {likes}</button>
        </div>
    );
}

export default HomePage;
