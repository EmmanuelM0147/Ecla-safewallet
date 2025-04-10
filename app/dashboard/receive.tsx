import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { ArrowLeft, Copy, Share2 } from 'lucide-react-native';
import { useWalletStore } from '@/store/wallet-store';
import QRCode from '@/components/QRCode';
import Button from '@/components/Button';
import colors from '@/constants/colors';

export default function ReceiveScreen() {
  const { wallet } = useWalletStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!wallet) {
      router.replace('/wallet-setup');
    }
  }, [wallet]);

  const copyToClipboard = () => {
    // In a real app, you would use Clipboard.setString(wallet.address)
    setCopied(true);
    Alert.alert('Copied', 'Address copied to clipboard');
    
    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const shareAddress = () => {
    // In a real app, you would use Share.share({
    //   message: wallet.address,
    //   title: 'My Wallet Address',
    // });
    Alert.alert('Share', 'Sharing functionality would be implemented here');
  };

  if (!wallet) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Stack.Screen 
        options={{
          title: 'Receive',
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receive</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.walletCard}>
            <Text style={styles.walletName}>{wallet.name}</Text>
            
            <View style={styles.qrContainer}>
              <QRCode 
                value={wallet.address} 
                size={240} 
                color={colors.text}
                backgroundColor={colors.white}
              />
            </View>
            
            <View style={styles.addressContainer}>
              <Text style={styles.addressLabel}>Wallet Address</Text>
              <View style={styles.addressBox}>
                <Text style={styles.address} numberOfLines={2} ellipsizeMode="middle">
                  {wallet.address}
                </Text>
              </View>
              
              <View style={styles.copyContainer}>
                {copied ? (
                  <Text style={styles.copiedText}>Address copied!</Text>
                ) : (
                  <TouchableOpacity 
                    onPress={copyToClipboard}
                    style={styles.copyButton}
                  >
                    <Copy size={16} color={colors.primary} />
                    <Text style={styles.copyText}>Copy Address</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
            <View style={styles.actionsContainer}>
              <Button 
                title="Copy Address" 
                onPress={copyToClipboard} 
                variant="primary"
                style={styles.actionButton}
              />
              <Button 
                title="Share" 
                onPress={shareAddress} 
                variant="outline"
                style={styles.actionButton}
              />
            </View>
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>How to receive funds</Text>
            <Text style={styles.infoText}>
              Share your wallet address or QR code with the sender. Make sure the sender is sending 
              compatible tokens to this address.
            </Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  walletCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  walletName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addressContainer: {
    width: '100%',
    marginBottom: 24,
  },
  addressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  addressBox: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  copyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  copiedText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  infoContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
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
});