import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, SplashScreen, Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth-store';
import { useWalletStore } from '@/store/wallet-store';
import Logo from '@/assets/images/logo';
import FloatingTokens from '@/assets/images/floating-tokens';
import Button from '@/components/Button';
import colors from '@/constants/colors';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const { isAuthenticated } = useAuthStore();
  const { wallet } = useWalletStore();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Prepare app and then hide splash screen
    async function prepare() {
      try {
        // Artificial delay to ensure everything is loaded
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Don't render anything until the app is ready
  if (!appIsReady) {
    return null;
  }

  // Use Redirect component instead of router.replace for initial routing
  if (isAuthenticated && wallet) {
    return <Redirect href="/dashboard" />;
  } else if (isAuthenticated) {
    return <Redirect href="/wallet-setup" />;
  }

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <>
      {/* Add Stack.Screen with headerShown: false to remove the header */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Logo size={80} />
          </View>
          
          <View style={styles.illustrationContainer}>
            <FloatingTokens width={320} height={240} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Exchange your{"\n"}
              favourite tokens{"\n"}
              instantly.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Sign Up" 
              onPress={handleSignUp} 
              variant="primary" 
              fullWidth
              style={styles.button}
            />
            <Button 
              title="Login" 
              onPress={handleLogin} 
              variant="outline" 
              fullWidth
              style={styles.button}
            />
          </View>
          
          <View style={styles.footerContainer}>
            <Text style={styles.termsText}>
              By signing up, you accept the{' '}
            </Text>
            <View style={styles.termsLinksContainer}>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.termsText}> and </Text>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  illustrationContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  termsLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  termsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 14,
  },
});