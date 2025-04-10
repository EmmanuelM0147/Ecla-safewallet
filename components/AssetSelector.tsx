import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import colors from '@/constants/colors';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  balance: string;
  icon: string;
}

interface AssetSelectorProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({
  assets,
  selectedAsset,
  onSelectAsset,
}) => {
  const renderAssetItem = ({ item }: { item: Asset }) => {
    const isSelected = selectedAsset?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.assetItem,
          isSelected && styles.selectedAssetItem,
        ]}
        onPress={() => onSelectAsset(item)}
        activeOpacity={0.7}
      >
        <View style={styles.assetIconContainer}>
          <Text style={styles.assetIcon}>{item.icon}</Text>
        </View>
        
        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{item.name}</Text>
          <Text style={styles.assetSymbol}>{item.symbol}</Text>
        </View>
        
        <View style={styles.assetBalanceContainer}>
          <Text style={styles.assetBalance}>{item.balance}</Text>
          <Text style={styles.assetBalanceSymbol}>{item.symbol}</Text>
        </View>
        
        <ChevronRight size={20} color={colors.gray} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        renderItem={renderAssetItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedAssetItem: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.backgroundSecondary,
  },
  assetIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  assetIcon: {
    fontSize: 20,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  assetSymbol: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  assetBalanceContainer: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  assetBalance: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  assetBalanceSymbol: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AssetSelector;