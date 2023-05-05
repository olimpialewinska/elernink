import { CoursePage } from "@/components/MyCourses/Course";
import { IUser } from "@/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";

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
}: {
  auth: InferGetServerSidePropsType<typeof getServerSideProps>;
}) {
  const router = useRouter();
  const { id } = router.query;
  return <CoursePage id={id} />;
}
CourseView.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
