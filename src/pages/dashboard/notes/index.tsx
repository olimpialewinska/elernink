import { Notes } from "@/components/Notes";
import { IUser, NoteInterface } from "@/types";
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
    .from("notes")
    .select("*")
    .eq("userId", userId)
    .order("name", { ascending: true });

  if (error) {
    return {
      props: {
        auth,
        notes: {},
      },
    };
  }

  return {
    props: {
      auth,
      notes: JSON.stringify(data),
    },
  };
};

export default function NotesView({
  auth,
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps> & { notes: any }) {
  return <Notes notes={notes} />;
}
