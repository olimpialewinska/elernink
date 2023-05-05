import FormData from "form-data";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    multiples: true,
  });

  const data: any = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const { topicId } = data.fields;
  const { courseId } = data.fields;

  const files = Object.values(data.files);

  if (!files) {
    res.status(401).send({
      error: "No files provided",
    });
    return;
  }

  if (Array.isArray(files[0])) {
    // wielokrotny plik
    const allFiles: any[] = [];
    files.forEach((fileArray: any) => {
      fileArray.forEach(async (file: any) => {
        const imageFile = file as formidable.File;

        const newName = imageFile.originalFilename?.replace(
          /[^a-zA-Z0-9.]/g,
          ""
        );
        const path = `/${courseId}/${topicId}/${newName}`;
        const buffer = fs.readFileSync(imageFile.filepath);

        const uploadPromise = supabase.storage
          .from("courseFiles")
          .upload(path, buffer, {
            cacheControl: "3600",
            upsert: false,
          })
          .then(({ data, error }) => {
            if (error) {
              throw new Error("Error uploading file");
            }
            return supabase.from("topic_files").insert([
              {
                filename: newName,
                path: path,
                topic_id: topicId,
                course_id: courseId,
                type: buffer.byteLength,
              },
            ]);
          });

        allFiles.push(uploadPromise);
      });
    });

    try {
      await Promise.all(allFiles);
    } catch (error) {
      res.status(401).send({
        error: "Error uploading files",
      });
      return;
    }
  } else {
    const allFiles: any[] = [];
    files.forEach(async (file) => {
      const imageFile = file as formidable.File;

      const newName = imageFile.originalFilename?.replace(/[^a-zA-Z0-9.]/g, "");
      const path = `/${courseId}/${topicId}/${newName}`;
      const buffer = fs.readFileSync(imageFile.filepath);

      const uploadPromise = supabase.storage
        .from("courseFiles")
        .upload(path, buffer, {
          cacheControl: "3600",
          upsert: false,
        })
        .then(({ data, error }) => {
          if (error) {
            throw new Error("Error uploading file");
          }
          return supabase.from("topic_files").insert([
            {
              filename: newName,
              path: path,
              topic_id: topicId,
              course_id: courseId,
              type: buffer.byteLength,
            },
          ]);
        });

      allFiles.push(uploadPromise);
    });

    try {
      await Promise.all(allFiles);
    } catch (error) {
      res.status(401).send({
        error: "Error uploading files",
      });
      return;
    }
  }

  res.status(200).send({
    success: "Files uploaded",
  });
}
