import { Create } from "@/components/Create";
import { IUser } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{ auth: IUser }> = async ({
  req,
}) => {
  const { Authorization } = req.cookies;

  if (!Authorization) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const auth = JSON.parse(Authorization);

  return {
    props: {
      auth,
    },
  };
};

export default function CourseView({
  auth,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Create />;
}
