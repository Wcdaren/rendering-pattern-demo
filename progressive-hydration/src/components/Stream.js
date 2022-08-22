import React, { useRef, useEffect } from "react";
import DATA from "../../data.json";

export default function Stream() {
  const items = DATA.map((user) => ({
    id: user.login.uuid,
    username: user.login.username,
    name: user.name.first + " " + user.name.last,
    avatar: user.picture.medium,
  }));

  return (
    <div className="stream">
      {items.map((profile) => (
        <Profile profile={profile} />
      ))}
    </div>
  );
}

export function Profile({ profile }) {
  const base = useRef();

  useEffect(() => {
    flash(base.current);
  }, []);

  return (
    <div className="list-group-item" ref={base} style={{ color: "red" }}>
      <div className="avatar">
        <img alt="avatar" src={profile.avatar} loading="lazy" />
      </div>
      <div className="details">
        <div className="info">
          <p className="name" style={{ color: "red" }}>
            {profile.name}
          </p>
          <p className="location">{profile.username}</p>
        </div>
      </div>
    </div>
  );
}

function flash(element) {
  element.style.backgroundColor = "#bd7aff";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.transition = "background-color 4s ease";
      element.style.backgroundColor = "transparent";
    });
  });
}
