import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  useColorScheme,
  Animated,
  Easing,
} from 'react-native';

const AnimatedCard = () => {
  const [isFront, setIsFront] = useState(true);

  const shakeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFront((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 1. Shake and Scale animation
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 75, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 75, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true, easing: Easing.linear }),
    ]).start();

    // 2. Cross-fade
    Animated.timing(fadeAnim, {
      toValue: isFront ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isFront, shakeAnim, fadeAnim]);

  const rotateZ = shakeAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-5deg', '0deg', '5deg'],
  });

  const scale = shakeAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1.05, 1, 1.05],
  });

  const frontOpacity = fadeAnim;
  const backOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.cardWrapper}>
      <Animated.View style={[styles.cardContainer, { transform: [{ rotateZ }, { scale }] }]}>
        <Animated.Image
          source={require('./assets/image/flip.png')}
          style={[styles.cardImage, { opacity: frontOpacity }]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('./assets/image/no_flip.png')}
          style={[styles.cardImage, styles.cardImageBack, { opacity: backOpacity }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#121212' : '#F5F5F7',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <AnimatedCard />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    // opacity for non-dark-mode is handled by the text color, but we can set fixed opacity
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    flex: 1,
  },
  cardContainer: {
    width: 220,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardImageBack: {
  },
});

export default App;
