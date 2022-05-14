import {useSession} from "../src/utils/useSession";

const Protected = () => {
  const [session] = useSession();
  return (
    <>
      <h1>A Protected Page</h1>
      <span>My name is {session?.user?.name}</span>
    </>
  );
};
Protected.auth = true;

export default Protected;
