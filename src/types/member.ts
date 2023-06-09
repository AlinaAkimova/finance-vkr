export interface IMemberPatch {
  userId: string;
  name?: string;
  email?: string;
  colour?: string;
  phone?: string;
  role?: string;
  hasPlanner?: boolean;
  defaultRate: number;
  currency?: string;
  status?: string;
  defaultLevel?: string;
  defaultLegalStatus?: string;
  defaultWeeklyCapacity: number;
  defaultExpertize?: string;
}

export enum WorkStatusVariant {
  active = 'Active',
  archived = 'Archived'
}

export enum LevelVariant {
  intern = 'Intern',
  junior = 'Junior',
  middle = 'Middle',
  highMiddle = 'High Middle',
  senior = 'Senior'
}

export enum ExpertizeVariant {
  pa = 'PA',
  qa = 'QA',
  design = 'Design',
  fullstack = 'Fullstack',
  frontend = 'Frontend',
  backend = 'Backend',
  flutter = 'Flutter',
  ios = 'IOS',
  android = 'Android'
}
