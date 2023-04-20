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
