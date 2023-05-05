import FormData from "form-data";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

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
  const form = formidable({ multiples: true });

  const formData: any = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  const { courseId } = formData.fields;

  const image = Object.values(formData.files)[0];

  if (!image) {
    res.status(401).send({
      error: "No image provided",
    });
    return;
  }

  const imageFile = image as formidable.File;

  const newName = imageFile.originalFilename?.replace(/[^a-zA-Z0-9.]/g, "");
  const path = `/${courseId}/${newName}`;
  const buffer = fs.readFileSync(imageFile.filepath);

  const { data, error } = await supabase.storage
    .from("photos")
    .upload(path, buffer, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
  }

  const { data: fileData, error: fileError } = await supabase
    .from("course")
    .update({ photoPath: path, photoName: newName })
    .eq("id", courseId);

  if (fileError) {
    res.status(401).send(JSON.stringify({ error: fileError.message }));
    return;
  }

  res.status(200).send(JSON.stringify({ data: "success" }));
}
