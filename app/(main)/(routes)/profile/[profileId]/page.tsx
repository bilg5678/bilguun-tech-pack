type Props = {
  params: {
    profileId: string;
  };
};

const ProfilePage = (props: Props) => {
  return <div>{props.params.profileId} user</div>;
};

export default ProfilePage;
