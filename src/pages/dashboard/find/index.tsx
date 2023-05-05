import { FindCourse } from "@/components/FindCourse";
import { mainContext } from "@/pages/_app";
import { IUser } from "@/types";
import { supabase } from "@/utils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useContext } from "react";

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

  const userId = auth.session.user.id;

  const { data: mycourses, error: mycoursesError } = await supabase
    .from("mycourses")
    .select("courseId")
    .eq("userId", userId);

  if (mycoursesError) {
    return {
      props: {
        auth,
        mycourses: {},
      },
    };
  }

  const courseIds = mycourses.map((course) => course.courseId);

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .not("id", "in", `(${courseIds})`)
    .neq("creator", userId)
    .order("id", { ascending: false });

  if (error) {
    return {
      props: {
        auth,
        mycourses: {},
      },
    };
  }

  const dataWithUrl = await Promise.all(
    data.map(async (course) => {
      if (!course.photoPath) {
        return {
          ...course,
          image: null,
        };
      }

      const { data: imageUrl } = supabase.storage
        .from("photos")
        .getPublicUrl(course.photoPath);

      return {
        ...course,
        image: imageUrl.publicUrl,
      };
    })
  );

  return {
    props: {
      auth,
      data: JSON.stringify(dataWithUrl),
    },
  };
};

export default function FindView({
  auth,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { data: any }) {
  const { close } = useContext(mainContext);
  return <FindCourse close={close} data={data} />;
}
