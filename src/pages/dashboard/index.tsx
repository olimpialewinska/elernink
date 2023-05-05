import { MyCourses } from "@/components/MyCourses";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useContext } from "react";
import { mainContext } from "../_app";
import { IUser } from "@/types";
import { supabase } from "@/utils";

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

  const id = auth.session.user.id;

  const { data: mycourses, error: mycoursesError } = await supabase
    .from("mycourses")
    .select("courseId")
    .eq("userId", id);

  if (mycoursesError) {
    return {
      props: {
        auth,
        data: {},
      },
    };
  }

  const courseIds = mycourses.map((course) => course.courseId);

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .filter("id", "in", `(${courseIds})`)
    .neq("creator", id)
    .order("id", { ascending: false });

  if (error) {
    return {
      props: {
        auth,
        data: {},
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

export default function DashboardPage({
  auth,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { data: any }) {
  const { close } = useContext(mainContext);
  return <MyCourses close={close} data={data} />;
}
