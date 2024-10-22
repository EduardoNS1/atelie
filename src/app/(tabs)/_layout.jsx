import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import Loader from "../../components/Loader";
import { useGlobalContext } from "../../context/GlobalProvider";

const THEME = {
  colors: {
    primary: "#0E0E0E",
    secondary: "#c2c2c2",
    background: "#FFFFFF",
    border: "#c2c2c2",
  }
};

// Array de configuração das tabs - facilita adicionar/remover tabs
// Cada objeto representa uma tab com suas propriedades
const TAB_CONFIG = [
  {
    name: "home",           // Nome da rota
    title: "Home",         // Título que aparece abaixo do ícone
    icon: "compass",         // Nome do ícone do Feather
  },
  {
    name: "articles",
    title: "Artigos",
    icon: "file-text",
  },
  {
    name: "create",
    title: "Criar",
    icon: "plus-circle",
  },
  {
    name: "profile",
    title: "Perfil",
    icon: "user",
  },
];

const TabIcon = ({ icon, color }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Feather 
        name={icon}
        size={24}
        color={color}
        style={styles.tabIcon}
      />
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: THEME.colors.primary,
          tabBarInactiveTintColor: THEME.colors.secondary,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBar,
        }}
      >
        {/* 
          Mapeia o array TAB_CONFIG para criar as tabs dinamicamente
          Para cada item no array, cria uma Tabs.Screen com as configurações específicas
          O map é uma função que percorre o array e retorna um novo elemento para cada item
        */}
        {TAB_CONFIG.map((tab) => (
          <Tabs.Screen
            key={tab.name}    // Key única para cada elemento (necessário no React)
            name={tab.name}   // Nome da rota
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={tab.icon}
                  color={color}
                  title={tab.title}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor={THEME.colors.background} style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: THEME.colors.background,
    borderTopColor: THEME.colors.border,
    height: 55,
    paddingBottom: 8,
    elevation: 8,             // Sombra no Android
    shadowColor: "#000",      // Cor da sombra no iOS
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default TabLayout;