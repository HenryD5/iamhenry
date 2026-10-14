export interface ExperienceRole {
  titleKey: string;
  periodKey: string;
}
export interface ExperienceStage {
  id: string;
  company: string;
  periodKey: string;
  titleKey: string;
  descriptionKey: string;
  progressionKey?: string;
  tagKey?: string;
  tagKeys?: readonly string[];
  roles?: readonly ExperienceRole[];
  isCurrent?: boolean;
  isVenture?: boolean;
}
export interface ExperienceViewModel extends Omit<
  ExperienceStage,
  | "periodKey"
  | "titleKey"
  | "descriptionKey"
  | "progressionKey"
  | "tagKey"
  | "roles"
> {
  period: string;
  title: string;
  description: string;
  progression?: string;
  tag?: string;
  tags?: readonly string[];
  roles?: readonly { title: string; period: string }[];
}

export interface ExperienceMetric {
  id: "years" | "companies" | "venture";
  labelKey: string;
}
