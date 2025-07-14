"use client";

import Actions from "./_sections/actions";
import EmoryAffiliation from "./_sections/affiliation";
import Alerts from "./_sections/alerts";
import Information from "./_sections/information";
import Posts from "./_sections/posts";
import Summary from "./_sections/summary";

const Profile = () => {
  return (
    <main className="space-y-10">
      <Summary />
      <Alerts />
      <Information />
      <EmoryAffiliation />
      <Posts />
      <Actions />
    </main>
  );
};

export default Profile;
