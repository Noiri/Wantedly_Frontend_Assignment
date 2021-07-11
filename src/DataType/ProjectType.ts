type Staff = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Project = {
  id: string;
  title: string;
  whyDescription: string;
  whatDescription: string;
  howDescription: string;
  imageUrlSmall: string;
  imageUrlLarge: string;
  staffs: Staff[];
};
