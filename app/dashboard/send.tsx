import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  ChevronRight, 
  Wallet, 
  Send, 
  DollarSign, 
  Users, 
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react-native';
import { useWalletStore } from '@/store/wallet-store';
import Input from '@/components/Input';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import AssetSelector from '@/components/AssetSelector';
import StepIndicator from '@/components/StepIndicator';

// Mock data for available assets
const AVAILABLE_ASSETS = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', balance: '0.00', icon: '⟠' },
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', balance: '0.00', icon: '₿' },
  { id: 'usdt', symbol: 'USDT', name: 'Tether', balance: '0.00', icon: '₮' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', balance: '0.00', icon: '₮' },
];

// Mock data for signers
const SIGNERS = [
  { id: '1', name: 'You', status: 'approved', address: '0x1234...5678' },
  { id: '2', name: 'Team Member 2', status: 'pending', address: '0x8765...4321' },
  { id: '3', name: 'Team Member 3', status: 'pending', address: '0x5678...1234' },
];

type SendStep = 'asset' | 'recipient' | 'amount' | 'review' | 'confirmation';

export default function SendScreen() {
  const { wallet } = useWalletStore();
  const [currentStep, setCurrentStep] = useState<SendStep>('asset');
  const [selectedAsset, setSelectedAsset] = useState(AVAILABLE_ASSETS[0]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [addressError, setAddressError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (!wallet) {
      router.replace('/wallet-setup');
    }
  }, [wallet]);

  const steps = [
    { id: 'asset', label: 'Asset' },
    { id: 'recipient', label: 'Recipient' },
    { id: 'amount', label: 'Amount' },
    { id: 'review', label: 'Review' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  const validateAddress = () => {
    if (!recipientAddress.trim()) {
      setAddressError('Recipient address is required');
      return false;
    }
    
    // Simple validation - in a real app, you'd have more robust validation
    if (recipientAddress.length < 32) {
      setAddressError('Invalid address format');
      return false;
    }
    
    setAddressError('');
    return true;
  };

  const validateAmount = () => {
    if (!amount.trim()) {
      setAmountError('Amount is required');
      return false;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setAmountError('Please enter a valid amount');
      return false;
    }
    
    // In a real app, you'd check if the user has sufficient balance
    setAmountError('');
    return true;
  };

  const handleNext = () => {
    if (currentStep === 'asset') {
      setCurrentStep('recipient');
    } else if (currentStep === 'recipient') {
      if (validateAddress()) {
        setCurrentStep('amount');
      }
    } else if (currentStep === 'amount') {
      if (validateAmount()) {
        setCurrentStep('review');
      }
    } else if (currentStep === 'review') {
      handleSubmitTransaction();
    }
  };

  const handleBack = () => {
    if (currentStep === 'recipient') {
      setCurrentStep('asset');
    } else if (currentStep === 'amount') {
      setCurrentStep('recipient');
    } else if (currentStep === 'review') {
      setCurrentStep('amount');
    } else if (currentStep === 'confirmation') {
      // Don't allow going back from confirmation
      return;
    }
  };

  const handleSubmitTransaction = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would submit the transaction to the blockchain
      // For demo purposes, we'll simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock transaction ID
      const mockTxId = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setTransactionId(mockTxId);
      
      setCurrentStep('confirmation');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'asset':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Asset</Text>
            <Text style={styles.stepDescription}>
              Choose which cryptocurrency you want to send
            </Text>
            
            <AssetSelector
              assets={AVAILABLE_ASSETS}
              selectedAsset={selectedAsset}
              onSelectAsset={setSelectedAsset}
            />
          </View>
        );
      
      case 'recipient':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Enter Recipient</Text>
            <Text style={styles.stepDescription}>
              Enter the wallet address of the recipient
            </Text>
            
            <Input
              label="Recipient Address"
              value={recipientAddress}
              onChangeText={(text) => {
                setRecipientAddress(text);
                if (addressError) setAddressError('');
              }}
              placeholder="Enter wallet address"
              error={addressError}
            />
            
            <View style={styles.infoContainer}>
              <AlertCircle size={20} color={colors.warning} />
              <Text style={styles.infoText}>
                Double-check the recipient address. Transactions cannot be reversed once confirmed.
              </Text>
            </View>
          </View>
        );
      
      case 'amount':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Enter Amount</Text>
            <Text style={styles.stepDescription}>
              Enter the amount of {selectedAsset.symbol} to send
            </Text>
            
            <View style={styles.amountContainer}>
              <Input
                label="Amount"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  if (amountError) setAmountError('');
                }}
                placeholder={`0.00 ${selectedAsset.symbol}`}
                keyboardType="numeric"
                error={amountError}
              />
              
              <Text style={styles.balanceText}>
                Available: {selectedAsset.balance} {selectedAsset.symbol}
              </Text>
            </View>
            
            <Input
              label="Note (Optional)"
              value={note}
              onChangeText={setNote}
              placeholder="Add a note to this transaction"
              multiline
              numberOfLines={3}
            />
          </View>
        );
      
      case 'review':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review Transaction</Text>
            <Text style={styles.stepDescription}>
              Please review your transaction details
            </Text>
            
            <View style={styles.reviewContainer}>
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Asset</Text>
                <View style={styles.reviewValueContainer}>
                  <Text style={styles.assetSymbol}>{selectedAsset.icon}</Text>
                  <Text style={styles.reviewValue}>{selectedAsset.name} ({selectedAsset.symbol})</Text>
                </View>
              </View>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Amount</Text>
                <Text style={styles.reviewValue}>{amount} {selectedAsset.symbol}</Text>
              </View>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Recipient</Text>
                <Text style={styles.reviewValue} numberOfLines={1} ellipsizeMode="middle">
                  {recipientAddress}
                </Text>
              </View>
              
              {note ? (
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewLabel}>Note</Text>
                  <Text style={styles.reviewValue}>{note}</Text>
                </View>
              ) : null}
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Network Fee</Text>
                <Text style={styles.reviewValue}>~0.0001 {selectedAsset.symbol}</Text>
              </View>
            </View>
            
            <View style={styles.multisigInfoContainer}>
              <Users size={20} color={colors.primary} />
              <Text style={styles.multisigInfoText}>
                This transaction requires approval from {SIGNERS.length} team members before it can be executed.
              </Text>
            </View>
          </View>
        );
      
      case 'confirmation':
        return (
          <View style={styles.stepContent}>
            <View style={styles.confirmationIconContainer}>
              <Clock size={48} color={colors.primary} />
            </View>
            
            <Text style={styles.confirmationTitle}>Transaction Initiated</Text>
            <Text style={styles.confirmationDescription}>
              Your transaction has been initiated and is awaiting approval from other team members.
            </Text>
            
            <View style={styles.transactionDetailsContainer}>
              <Text style={styles.transactionDetailsLabel}>Transaction ID</Text>
              <Text style={styles.transactionId} numberOfLines={1} ellipsizeMode="middle">
                {transactionId}
              </Text>
              
              <Text style={styles.transactionDetailsLabel}>Amount</Text>
              <Text style={styles.transactionDetailsValue}>
                {amount} {selectedAsset.symbol}
              </Text>
              
              <Text style={styles.transactionDetailsLabel}>Status</Text>
              <Text style={styles.transactionDetailsValue}>
                Pending Approvals ({SIGNERS.filter(s => s.status === 'approved').length}/{SIGNERS.length})
              </Text>
            </View>
            
            <View style={styles.signersContainer}>
              <Text style={styles.signersTitle}>Team Approvals</Text>
              
              {SIGNERS.map((signer) => (
                <View key={signer.id} style={styles.signerItem}>
                  <View style={styles.signerInfo}>
                    <Text style={styles.signerName}>{signer.name}</Text>
                    <Text style={styles.signerAddress} numberOfLines={1} ellipsizeMode="middle">
                      {signer.address}
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.signerStatus,
                    signer.status === 'approved' ? styles.signerApproved : styles.signerPending
                  ]}>
                    <Text style={[
                      styles.signerStatusText,
                      signer.status === 'approved' ? styles.signerApprovedText : styles.signerPendingText
                    ]}>
                      {signer.status === 'approved' ? 'Approved' : 'Pending'}
                    </Text>
                    {signer.status === 'approved' && (
                      <CheckCircle2 size={16} color={colors.success} style={styles.signerStatusIcon} />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  const renderActionButton = () => {
    if (currentStep === 'confirmation') {
      return (
        <Button
          title="Back to Dashboard"
          onPress={() => router.replace('/dashboard')}
          variant="primary"
          fullWidth
          style={styles.actionButton}
        />
      );
    }
    
    return (
      <Button
        title={currentStep === 'review' ? 'Submit Transaction' : 'Continue'}
        onPress={handleNext}
        loading={isSubmitting}
        disabled={isSubmitting}
        variant="primary"
        fullWidth
        style={styles.actionButton}
      />
    );
  };

  if (!wallet) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Stack.Screen 
        options={{
          title: 'Send',
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        {currentStep !== 'confirmation' && (
          <TouchableOpacity 
            onPress={handleBack}
            style={styles.backButton}
            disabled={currentStep === 'asset'}
          >
            <ArrowLeft size={24} color={currentStep === 'asset' ? colors.gray : colors.text} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Send {selectedAsset.symbol}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {currentStep !== 'confirmation' && (
            <StepIndicator 
              steps={steps} 
              currentStep={steps.findIndex(step => step.id === currentStep)}
            />
          )}
          
          {renderStepContent()}
          
          <View style={styles.actionContainer}>
            {renderActionButton()}
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  stepContent: {
    flex: 1,
    marginTop: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  amountContainer: {
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  reviewContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  reviewValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetSymbol: {
    fontSize: 18,
    marginRight: 8,
  },
  reviewValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  multisigInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 8,
  },
  multisigInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  actionButton: {
    marginBottom: 16,
  },
  confirmationIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmationDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  transactionDetailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionDetailsLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  transactionId: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 16,
  },
  transactionDetailsValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 16,
  },
  signersContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  signerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  signerInfo: {
    flex: 1,
    marginRight: 12,
  },
  signerName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  signerAddress: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  signerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  signerApproved: {
    backgroundColor: colors.success + '20', // 20% opacity
  },
  signerPending: {
    backgroundColor: colors.warning + '20', // 20% opacity
  },
  signerStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  signerApprovedText: {
    color: colors.success,
  },
  signerPendingText: {
    color: colors.warning,
  },
  signerStatusIcon: {
    marginLeft: 4,
  },
});