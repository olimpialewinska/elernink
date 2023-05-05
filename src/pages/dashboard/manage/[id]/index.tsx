import { Edit } from "@/components/Manage/Edit";
import { IUser } from "@/types";
import { supabase } from "@/utils";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { useEditor } from "slate-react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { Authorization } = context.req.cookies;

  if (!Authorization) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (!context.params) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  const { id } = context.params;

  const auth = JSON.parse(Authorization);
  const creator = auth.session.user.id;

  const { data: data2, error: error2 } = await supabase
    .from("course")
    .select("*")
    .match({
      id: id,
      creator: creator,
    });

  if (error2) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  if (data2.length === 0) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("id", id);

  if (error) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  let imageUrl: string | null = "";
  if (data[0].photoPath) {
    imageUrl = supabase.storage.from("photos").getPublicUrl(data[0].photoPath)
      .data.publicUrl;
  } else {
    imageUrl = null;
  }

  const { data: topics, error: errorTopics } = await supabase
    .from("topic")
    .select("*")
    .eq("course_id", id)
    .order("order", { ascending: true });

  if (errorTopics) {
  }

  return {
    props: {
      auth,
      data: JSON.stringify({
        data,
        topics,
        imageUrl,
      }),
    },
  };
};

export default function EditView({
  auth,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { notes: any }) {
  const router = useRouter();
  const { id } = router.query;

  const courseID = id?.toString();

  if (!courseID) {
    return <div>404</div>;
  }

  return <Edit id={courseID} userId={auth} data={JSON.parse(data)} />;
}

EditView.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
