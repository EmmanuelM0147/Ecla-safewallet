import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { LogOut, Wallet, Shield, Copy, ExternalLink, ArrowDownLeft, ArrowUpRight } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';
import { useWalletStore } from '@/store/wallet-store';
import Button from '@/components/Button';
import colors from '@/constants/colors';

export default function DashboardScreen() {
  const { user, logout } = useAuthStore();
  const { wallet, clearWallet } = useWalletStore();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
    
    if (!wallet) {
      router.replace('/wallet-setup');
    }
  }, [user, wallet]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            clearWallet();
            logout();
            router.replace('/');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const copyToClipboard = (text: string) => {
    // In a real app, you would use Clipboard.setString(text)
    Alert.alert('Copied', 'Address copied to clipboard');
  };

  const navigateToReceive = () => {
    router.push('/dashboard/receive');
  };

  const navigateToSend = () => {
    router.push('/dashboard/send');
  };

  if (!wallet) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Stack.Screen 
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <LogOut size={20} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.walletCard}>
            <View style={styles.walletCardHeader}>
              <View style={styles.walletIconContainer}>
                <Wallet size={24} color={colors.white} />
              </View>
              <Text style={styles.walletName}>{wallet.name}</Text>
              <View style={styles.walletTypeContainer}>
                <Shield size={12} color={colors.primary} />
                <Text style={styles.walletType}>Secure</Text>
              </View>
            </View>
            
            <View style={styles.walletAddressContainer}>
              <Text style={styles.walletAddressLabel}>Wallet Address</Text>
              <View style={styles.walletAddressRow}>
                <Text style={styles.walletAddress} numberOfLines={1} ellipsizeMode="middle">
                  {wallet.address}
                </Text>
                <TouchableOpacity 
                  onPress={() => copyToClipboard(wallet.address)}
                  style={styles.copyButton}
                >
                  <Copy size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.walletBalanceContainer}>
              <Text style={styles.walletBalanceLabel}>Balance</Text>
              <Text style={styles.walletBalance}>0.00 ETH</Text>
            </View>
            
            <View style={styles.walletActionsContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={navigateToSend}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: colors.primaryLight }]}>
                  <ArrowUpRight size={20} color={colors.primary} />
                </View>
                <Text style={styles.actionText}>Send</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={navigateToReceive}
              >
                <View style={[styles.actionIconContainer, { backgroundColor: colors.backgroundSecondary }]}>
                  <ArrowDownLeft size={20} color={colors.primary} />
                </View>
                <Text style={styles.actionText}>Receive</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No transactions yet</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <View style={styles.securityInfoContainer}>
              <View style={styles.securityInfoItem}>
                <Shield size={20} color={colors.primary} />
                <Text style={styles.securityInfoText}>
                  Your wallet requires team approval for transactions
                </Text>
              </View>
              <TouchableOpacity style={styles.securityLearnMore}>
                <Text style={styles.securityLearnMoreText}>Learn more</Text>
                <ExternalLink size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
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
  logoutButton: {
    padding: 8,
    marginRight: 8,
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
  },
  walletCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  walletIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  walletName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  walletTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  walletType: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  walletAddressContainer: {
    marginBottom: 16,
  },
  walletAddressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  walletAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAddress: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  copyButton: {
    padding: 4,
  },
  walletBalanceContainer: {
    marginBottom: 24,
  },
  walletBalanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  walletBalance: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  walletActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  emptyStateContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  securityInfoContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: 16,
  },
  securityInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityInfoText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  securityLearnMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  securityLearnMoreText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});