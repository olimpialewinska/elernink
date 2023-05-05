import { Manage } from "@/components/Manage";
import { IUser } from "@/types";
import { supabase } from "@/utils";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextApiRequest,
} from "next";

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

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("creator", id);

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

export default function ManageView({
  auth,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { data: any }) {
  return <Manage data={data} />;
}
