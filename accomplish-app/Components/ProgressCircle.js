import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View ,Text} from 'react-native';

const MyProgressCircle = ({ progress }) => {
    const isCompleted = progress === 1;
    const progressPercent = Math.round(progress * 100);
  
    // Calculate the position of the check circle icon
    const checkIconPosition = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -15 }, { translateY: -15 }], 
    };
  
    return (
      <View style={{ height: '35%', width: '35%', marginTop: 15, position: 'relative' }}>
        <ProgressCircle
          style={{ flex: 1 }}
          progress={progress}
          progressColor={isCompleted ? 'gold' : 'black'}
          startAngle={-Math.PI * 0.8}
          endAngle={Math.PI * 0.8}
        />
        {!isCompleted && (
          <View style={[{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -15 }, { translateY: -8 }] }]}>
            <Text style={{ fontSize: 16, color: 'black', textAlign: 'center' }}>{`${progressPercent}%`}</Text>
          </View>
        )}
        {isCompleted && (
          <MaterialCommunityIcons
            name="check-circle"
            size={30}
            color="gold"
            style={checkIconPosition}
          />
        )}
      </View>
    );
  };
export default MyProgressCircle;
