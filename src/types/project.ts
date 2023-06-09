export interface IProject {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  hasActualContract: boolean;
  colour?: string;
  manager: string;
  clientId: string;
  contractStatus?: string;
  workStatus?: string;
  contractCurrency?: string;
  assignedHours?: number;
}

export interface IProjectPatch {
  name: string;
  startAt: string;
  endAt: string;
  billableStatus?: boolean;
  clientId?: string;
  manager: string;
  contractStatus?: string;
  status?: string;
  currency?: string;
  archivedLink?: string;
  colour?: string;
}

export enum ContractStatusVariant {
  approval = 'Approval',
  signing = 'Signing',
  archived = 'Archived',
  na = 'N/A'
}

export enum ColourProjectVariant {
  lightPurple = 'Light Purple',
  purple = 'Purple',
  orange = 'Orange',
  lightGreen = 'Light Green',
  green = 'Green',
  blue = 'Blue',
  red = 'Red',
  indigo = 'Indigo',
  yellow = 'Yellow'
}

export enum ColourCodeProjectVariant {
  lightPurple = '#C14EF8',
  purple = '#9B51E0',
  orange = '#F36D25',
  lightGreen = '#4CAF50',
  green = '#26A69A',
  blue = '#56CCF2',
  red = '#F50057',
  indigo = '#536DFE',
  yellow = '#FFB400'
}

export type ColourType = {
  value: ColourProjectVariant;
  code: ColourCodeProjectVariant;
};

export const ColourProjectOptions: ColourType[] = [
  {
    value: ColourProjectVariant.lightPurple,
    code: ColourCodeProjectVariant.lightPurple
  },
  {
    value: ColourProjectVariant.purple,
    code: ColourCodeProjectVariant.purple
  },
  {
    value: ColourProjectVariant.lightGreen,
    code: ColourCodeProjectVariant.lightGreen
  },
  {
    value: ColourProjectVariant.red,
    code: ColourCodeProjectVariant.red
  },
  {
    value: ColourProjectVariant.green,
    code: ColourCodeProjectVariant.green
  },
  {
    value: ColourProjectVariant.indigo,
    code: ColourCodeProjectVariant.indigo
  },
  {
    value: ColourProjectVariant.blue,
    code: ColourCodeProjectVariant.blue
  },
  {
    value: ColourProjectVariant.orange,
    code: ColourCodeProjectVariant.orange
  },
  {
    value: ColourProjectVariant.yellow,
    code: ColourCodeProjectVariant.yellow
  }
];

export enum WorkStatusVariant {
  active = 'Active',
  onHold = 'OnHold',
  archived = 'Archived',
  planned = 'Planned'
}
