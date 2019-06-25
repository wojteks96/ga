import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from "react-navigation";

export interface NavigationViewProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
