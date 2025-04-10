import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { useWalletStore } from '@/store/wallet-store';
import Input from '@/components/Input';
import Button from '@/components/Button';
import colors from '@/constants/colors';

export default function CreateWalletScreen() {
  const [walletName, setWalletName] = useState('');
  const [walletNameError, setWalletNameError] = useState('');
  const { createWallet, isCreating, error } = useWalletStore();

  const validateWalletName = () => {
    if (!walletName.trim()) {
      setWalletNameError('Wallet name is required');
      return false;
    }
    
    setWalletNameError('');
    return true;
  };

  const handleCreateWallet = async () => {
    if (validateWalletName()) {
      try {
        await createWallet(walletName);
        router.replace('/dashboard');
      } catch (error) {
        Alert.alert('Error', 'Failed to create wallet. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Stack.Screen 
        options={{
          title: 'Create Wallet',
          headerShown: false,
        }}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Wallet</Text>
            <View style={styles.placeholder} />
          </View>
          
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Shield size={48} color={colors.primary} />
            </View>
            
            <Text style={styles.title}>Create a new secure wallet</Text>
            <Text style={styles.subtitle}>
              ECLA uses advanced multi-approval technology to secure your assets
            </Text>
            
            <View style={styles.form}>
              <Input
                label="Wallet Name"
                value={walletName}
                onChangeText={(text) => {
                  setWalletName(text);
                  if (walletNameError) setWalletNameError('');
                }}
                placeholder="Enter a name for your wallet"
                error={walletNameError || (error ? 'Failed to create wallet' : '')}
              />
              
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>What is shared approval?</Text>
                <Text style={styles.infoText}>
                  Your ECLA wallet requires multiple approvals to authorize a transaction, 
                  providing an extra layer of security for your assets.
                </Text>
              </View>
              
              <Button
                title="Create Wallet"
                onPress={handleCreateWallet}
                loading={isCreating}
                disabled={isCreating}
                fullWidth
                style={styles.button}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  infoContainer: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  button: {
    marginTop: 16,
  },
});