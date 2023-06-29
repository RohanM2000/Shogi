import { useDispatch, useSelector } from "react-redux";
import csrfFetch from "../../store/csrf";
import { useEffect, useState } from "react";
import { fetchUser, getUser, receiveUser } from "../../store/users";
import "./ProfilePage.scss";
export default function () {
    const currentUser = useSelector(state=> state.session.user ? state.session.user : {});
    const dispatch = useDispatch();
    const user = useSelector(getUser(currentUser.id));
    const lang = useSelector(state=>state.languages.lang);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(()=>{
        dispatch(fetchUser(currentUser.id));
    },[dispatch]);

    function handleFile({currentTarget}) {
        const file = currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        }
        else setPhotoUrl(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!photoFile || !photoUrl) return;
        const formData = new FormData();
        if (photoFile) {
            formData.append('user[photo]', photoFile);
        }

        const response = await csrfFetch(`/api/users/${currentUser.id}`,{
            method: "PATCH",
            body: formData
        });
        
        if (response.ok) {
            const updatedUser = await response.json();
            dispatch(receiveUser(updatedUser.user));
            setPhotoFile(null);
            setPhotoUrl(null);
        }

    };

    let preview = null;
    if (photoUrl) preview = <img src={photoUrl} alt="" className="preview-image"/>
    let creationDate;
    if (user) creationDate = new Date(user.createdAt);
    return user ? (
        <div className="profile-holder">
            <div className="profile-main">
                <img src={user.photoUrl} alt=""/>
                <ul className="info-list">
                    <li>
                        {user.username}
                    </li>
                    <li>
                        {currentUser.email}
                    </li>
                    <li>
                        {`${creationDate.getFullYear()}/${creationDate.getMonth() > 8 ? creationDate.getMonth() + 1 : "0" + (creationDate.getMonth() + 1)}/${creationDate.getDate() > 9 ? creationDate.getDate() : "0" + creationDate.getDate()}`}
                    </li>
                </ul>
            </div>
            <div className="preview-area">
                <form onSubmit={handleSubmit}>
                    <input type="file" className={lang === "en" ? "image-input" : "image-input japanese-image"} onChange={handleFile} />
                    <button>{lang === "en" ? "Upload Photo" : "写真を載せ込む"}</button>
                </form>
                {preview}
            </div>
        </div>
    ) : null;

};