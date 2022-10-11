import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import PreLoad from "../screens/PreLoad";
import SingIn from "../screens/SignIn";
import MainTab from "./MainTab"

const { Screen, Navigator } = createNativeStackNavigator();
 
const MainStack = () => {
     
    return(

        <Navigator  screenOptions={{
            headerShown: false,
            
        }}>
            <Screen name='Preload' component={PreLoad} />
            <Screen name='Login' component={Login} />
            <Screen name='SingIn' component={SingIn} />
            <Screen name='MainTab' component={MainTab} />

        </Navigator>

    )

}

export default MainStack