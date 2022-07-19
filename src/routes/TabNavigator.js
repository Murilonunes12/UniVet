// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, ContactStackNavigator } from "./StackNavigator";
import Tabs from "../Components/Tabs";
import Routes from "./StackRouts";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tabs/>
      <Routes/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;