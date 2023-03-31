import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList, ScreenNames } from "./AppNavigator";


export const useAppNav = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};

export const useScreenRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>> ();
};
