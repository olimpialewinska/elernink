export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
  image: string;
}

export interface TopicInterface {
  topic: string;
  lesson: string;
  order: number;
  listOfFiles: File[];
  id: number;
}

export interface FileInterface {
  id: string;
  name: string;
  url: string;
}

export interface NoteInterface {
  id: string;
  name: string;
  value: string;
  userId: string;
}
