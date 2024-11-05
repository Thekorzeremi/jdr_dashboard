import React from 'react';

function Profile({ profile, updateProfile }) {
    return (
        <div>
            <h2>Profil</h2>
            {Object.keys(profile).map((item) => (
                <div key={item}>
                    <label>{item}</label>
                    <input
                      type="text"
                      value={profile[item]}
                      onChange={(e) => updateProfile(profile, e.target.value)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Profile;