import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '@/constants/colors';

interface StepIndicatorProps {
  steps: Array<{ id: string; label: string }>;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <View 
                  style={[
                    styles.connector,
                    isCompleted ? styles.activeConnector : null,
                  ]} 
                />
              )}
              <View 
                style={[
                  styles.stepCircle,
                  isActive ? styles.activeStepCircle : null,
                  isCompleted ? styles.completedStepCircle : null,
                ]}
              >
                <Text 
                  style={[
                    styles.stepNumber,
                    (isActive || isCompleted) ? styles.activeStepNumber : null,
                  ]}
                >
                  {index + 1}
                </Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>
      
      <View style={styles.labelsContainer}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <View key={`label-${step.id}`} style={styles.labelContainer}>
              <Text 
                style={[
                  styles.stepLabel,
                  (isActive || isCompleted) ? styles.activeStepLabel : null,
                ]}
                numberOfLines={1}
              >
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeStepCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  completedStepCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeStepNumber: {
    color: colors.white,
  },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  activeConnector: {
    backgroundColor: colors.primary,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: {
    width: 28,
    alignItems: 'center',
    flex: 1,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  activeStepLabel: {
    color: colors.text,
    fontWeight: '500',
  },
});

export default StepIndicator;