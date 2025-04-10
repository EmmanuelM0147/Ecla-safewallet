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
import { ArrowLeft, Download, Key } from 'lucide-react-native';
import { useWalletStore } from '@/store/wallet-store';
import Input from '@/components/Input';
import Button from '@/components/Button';
import colors from '@/constants/colors';

type ImportMethod = 'privateKey' | 'seedPhrase';

export default function ImportWalletScreen() {
  const [walletName, setWalletName] = useState('');
  const [importValue, setImportValue] = useState('');
  const [importMethod, setImportMethod] = useState<ImportMethod>('privateKey');
  const [walletNameError, setWalletNameError] = useState('');
  const [importValueError, setImportValueError] = useState('');
  const { importWallet, isCreating, error } = useWalletStore();

  const validateForm = () => {
    let isValid = true;
    
    if (!walletName.trim()) {
      setWalletNameError('Wallet name is required');
      isValid = false;
    } else {
      setWalletNameError('');
    }
    
    if (!importValue.trim()) {
      setImportValueError(`${importMethod === 'privateKey' ? 'Private key' : 'Seed phrase'} is required`);
      isValid = false;
    } else {
      // Simple validation - in a real app, you'd have more robust validation
      if (importMethod === 'privateKey' && importValue.length < 32) {
        setImportValueError('Invalid private key format');
        isValid = false;
      } else if (importMethod === 'seedPhrase' && importValue.split(' ').length < 12) {
        setImportValueError('Seed phrase should contain at least 12 words');
        isValid = false;
      } else {
        setImportValueError('');
      }
    }
    
    return isValid;
  };

  const handleImportWallet = async () => {
    if (validateForm()) {
      try {
        await importWallet(importValue, walletName);
        router.replace('/dashboard');
      } catch (error) {
        Alert.alert('Error', 'Failed to import wallet. Please try again.');
      }
    }
  };

  const toggleImportMethod = () => {
    setImportMethod(importMethod === 'privateKey' ? 'seedPhrase' : 'privateKey');
    setImportValue('');
    setImportValueError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Stack.Screen 
        options={{
          title: 'Import Wallet',
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
            <Text style={styles.headerTitle}>Import Wallet</Text>
            <View style={styles.placeholder} />
          </View>
          
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Download size={48} color={colors.primary} />
            </View>
            
            <Text style={styles.title}>Import your secure wallet</Text>
            <Text style={styles.subtitle}>
              Import your existing wallet using a private key or seed phrase
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
                error={walletNameError}
              />
              
              <View style={styles.methodToggleContainer}>
                <Text style={styles.methodLabel}>Import Method:</Text>
                <TouchableOpacity onPress={toggleImportMethod}>
                  <Text style={styles.methodToggle}>
                    Switch to {importMethod === 'privateKey' ? 'Seed Phrase' : 'Private Key'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Input
                label={importMethod === 'privateKey' ? 'Private Key' : 'Seed Phrase'}
                value={importValue}
                onChangeText={(text) => {
                  setImportValue(text);
                  if (importValueError) setImportValueError('');
                }}
                placeholder={
                  importMethod === 'privateKey' 
                    ? 'Enter your private key' 
                    : 'Enter your seed phrase (12 or 24 words)'
                }
                multiline={importMethod === 'seedPhrase'}
                numberOfLines={importMethod === 'seedPhrase' ? 3 : 1}
                secureTextEntry={true}
                error={importValueError || (error ? 'Failed to import wallet' : '')}
              />
              
              <View style={styles.securityNote}>
                <Key size={20} color={colors.warning} />
                <Text style={styles.securityNoteText}>
                  Never share your private key or seed phrase with anyone. Keep it secure.
                </Text>
              </View>
              
              <Button
                title="Import Wallet"
                onPress={handleImportWallet}
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
  methodToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  methodLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  methodToggle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  securityNoteText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    flex: 1,
  },
  button: {
    marginTop: 16,
  },
});