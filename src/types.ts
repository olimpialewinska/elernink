export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
}

export interface TopicInterface {
  topic: string;
  lesson: string;
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
