import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5} from '@expo/vector-icons';


export default function RatingRead({ points }) {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starColor = "rgba(197,200,152,1)"
  return (
    <View style={styles.ratingBarStyle}>
      {maxRating.map((item) => {
        return (
          item <= points
            ? <FontAwesome5 name="star" size={20} color={starColor} solid/>
            : ( points % 1 != 0 && item == Math.ceil(points)
                ? <FontAwesome5 name="star-half-alt" size={20} color={starColor} />
                : <FontAwesome5 name="star" size={20} color={starColor} />
            )
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingBarStyle: {
    justifyContent: 'left',
    flexDirection: 'row',
    marginTop: "2%",
  },
});