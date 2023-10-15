import { UserType } from "./User";
import { JourneyType } from "./Journey";
export type StepType = {
  journeyId: number;
  id: number;
  name: string;
  hint: string;
  latitude: number,
  longitude: number,
  user: UserType;
  journey: JourneyType;
  created_at: string;
}