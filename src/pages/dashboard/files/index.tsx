import { Files } from "@/components/Files";
import { IUser } from "@/types";
import { supabase } from "@/utils";
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

  const userId = auth.session.user.id;

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("userId", userId);

  if (error) {
    return {
      props: {
        auth,
        files: {},
      },
    };
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: publicUrlData } = supabase.storage
        .from("files")
        .getPublicUrl(`${userId}/${file.name}`);

      const { data: downloadData, error: downloadError } =
        await supabase.storage.from("files").download(`${userId}/${file.name}`);

      if (downloadError) {
        return {
          props: {
            auth,
            files: {},
          },
        };
      }

      return {
        id: file.id,
        url: publicUrlData.publicUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        download: downloadData,
      };
    })
  );

  return {
    props: {
      auth,
      files: JSON.stringify(files),
    },
  };
};

export default function FilesView({
  auth,
  files,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { files: any }) {
  return <Files files={files} />;
}
