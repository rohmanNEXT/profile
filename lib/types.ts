// ---- contants 
export interface Skill {
  name: string;
  icon: string;
  experience: string;
}

export interface FeatureCategory {
  title: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  testLogin?: {
    user?: {
      email: string;
      password: string;
    };
    admin?: {
      email: string;
      password: string;
    };
    superadmin?: {
      email: string;
      password: string;
    };
  };
  features?: {
    fe: (string | FeatureCategory)[];
    be: (string | FeatureCategory)[];
    allLib?: (string | FeatureCategory)[];
  };
}

export interface Experience {
  company: string;
  role: string;
  salary: string;
  period: string;
  location: string;
  duration: string;
  achievements: string[];
  category: string;
}


// ---- pdf
export type Header = {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
};

export type Education = {
  school: string;
  location: string;
  major: string;
  date: string;
};


export type Reference = {
  label: string;
  url: string;
};