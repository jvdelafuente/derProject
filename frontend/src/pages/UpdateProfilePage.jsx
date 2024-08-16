// src/pages/UpdateProfilePage.jsx
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import UpdateProfileForm from "../forms/UpdateProfileForm";
import Profile from "../components/ProfileSection/Profile";

import "./UpdateProfilePage.css";
import { CgClose } from "react-icons/cg";

const UpdateProfilePage = () => {
  const { authUpdateProfile, loading, authUser } = useAuth();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleButtonClick = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return (
    <main>
      <div className="profileBig">
        <div className="profileMedium">
          {showUpdateForm ? (
            <>
              <div className="profileEditButtonContainer">
                <button
                  className="profileEditButton"
                  onClick={handleButtonClick}
                >
                  <CgClose />
                </button>
              </div>
              <UpdateProfileForm
                authUpdateProfile={authUpdateProfile}
                user_id={authUser?.id}
                setShowUpdateForm={setShowUpdateForm}
                loading={loading}
              />
            </>
          ) : (
            <Profile authUser={authUser} />
          )}
        </div>
      </div>
    </main>
  );
};

export default UpdateProfilePage;
