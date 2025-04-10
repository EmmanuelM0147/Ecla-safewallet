import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { PlusCircle, Download, Key } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useWalletStore } from '@/store/wallet-store';
import OptionCard from '@/components/OptionCard';
import Button from '@/components/Button';
import colors from '@/constants/colors';

type WalletOption = 'create' | 'import' | null;

export default function WalletSetupScreen() {
  const [selectedOption, setSelectedOption] = useState<WalletOption>(null);
  const { isAuthenticated, user } = useAuthStore();
  const { wallet } = useWalletStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
    
    if (wallet) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, wallet]);

  const handleOptionSelect = (option: WalletOption) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === 'create') {
      router.push('/wallet-setup/create');
    } else if (selectedOption === 'import') {
      router.push('/wallet-setup/import');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Stack.Screen 
        options={{
          title: 'Wallet Setup',
          headerShown: true,
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Set up your wallet</Text>
          <Text style={styles.subtitle}>
            Choose how you want to set up your secure wallet
          </Text>
          
          <View style={styles.optionsContainer}>
            <OptionCard
              title="Create New Wallet"
              description="Create a new secure wallet with team protection"
              icon={<PlusCircle size={24} color={colors.primary} />}
              onPress={() => handleOptionSelect('create')}
              selected={selectedOption === 'create'}
            />
            
            <OptionCard
              title="Import Existing Wallet"
              description="Import your wallet using private key or seed phrase"
              icon={<Download size={24} color={colors.primary} />}
              onPress={() => handleOptionSelect('import')}
              selected={selectedOption === 'import'}
            />
          </View>
          
          <View style={styles.securityNote}>
            <Key size={20} color={colors.primary} />
            <Text style={styles.securityNoteText}>
              Your keys are encrypted and never leave your device
            </Text>
          </View>
          
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedOption}
            fullWidth
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
  },
  securityNoteText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    flex: 1,
  },
  continueButton: {
    marginTop: 'auto',
  },
});