"use client";

import {
  Actions,
  EmoryAffiliation,
  Information,
  Posts,
  Summary,
} from "./_sections";

const Profile = () => {
  return (
    <main className="space-y-10">
      <Summary />
      <Information />
      <EmoryAffiliation />
      <Posts />
      <Actions />
    </main>
  );
};

export default Profile;
