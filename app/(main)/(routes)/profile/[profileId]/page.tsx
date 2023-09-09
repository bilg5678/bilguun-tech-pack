type Props = {
  params: {
    profileId: string;
  };
};

const ProfilePage = (props: Props) => {
  return <div>{props.params.profileId}</div>;
};

export default ProfilePage;
