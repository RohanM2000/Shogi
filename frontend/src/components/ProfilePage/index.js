import { useDispatch, useSelector } from "react-redux";
import csrfFetch from "../../store/csrf";
import { useEffect, useState } from "react";
import { fetchUser, getUser, receiveUser } from "../../store/users";
import "./ProfilePage.scss";
export default function () {
    const currentUser = useSelector(state=> state.session.user ? state.session.user : {});
    const dispatch = useDispatch();
    const user = useSelector(getUser(currentUser.id));
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

        const formData = new FormData();
        if (photoFile) {
            formData.append('user[photo]', photoFile);
        }
        console.log(photoFile);

        const response = await csrfFetch(`/api/users/${currentUser.id}`,{
            method: "PATCH",
            body: formData
        });
        
        if (response.ok) {
            const updatedUser = await response.json();
            dispatch(receiveUser(updatedUser));
        }

    };

    let preview = null;
    if (photoUrl) preview = <img src={photoUrl} alt="" />

    return user ? (
        <div className="profile-main">
            <ul className="info-list">
                <img src={user.photoUrl} alt=""/>
                <li>
                    {user.username}
                </li>
                <li>
                    {currentUser.email}
                </li>
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFile}/> 
                <button>Upload Photo</button>
            </form>
            {preview}
        </div>
    ) : null;

};