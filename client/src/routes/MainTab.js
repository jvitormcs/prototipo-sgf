import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons'
import Home from "../screens/Home";
import TransacoesRegistro from '../screens/TrasacoesRegistro'

const { Screen, Navigator } = createBottomTabNavigator();

export default () => {
     
    return(

        <Navigator screenOptions={{
            tabBarActiveTintColor: '#FF9F1C',
            tabBarInactiveTintColor: '#011627',
            headerShown: false,
        }} >

            <Screen name='Home' component={Home} options={
                {tabBarLabel: 'Home',
            tabBarIcon:({color, size}) => (
                <MaterialIcons color={color} size={size} name='home' />
            )}
            }/>
            <Screen name='TransacoesRegistro' component={TransacoesRegistro} options={
                {tabBarLabel: 'Transações',
            tabBarIcon:({color, size}) => (
                <MaterialIcons color={color} size={size} name='add-circle' />
            )}
            }/>
            {/* <Screen name='Profile' component={Home} options={
                {tabBarLabel: 'Home',
            tabBarIcon:({color, size}) => (
                <MaterialIcons color={color} size={size} name='person' />
            )}
            }/> */}

        </Navigator>

    )

}