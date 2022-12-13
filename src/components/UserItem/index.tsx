import React, {useState} from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {StackOverflowUser} from '../../models/StackOverflowUser';

type Props = {
  user: StackOverflowUser;
};

export const UserItem: React.FC<Props> = ({user}) => {
  const [expanded, setExpanded] = useState(false);
  const [following, setFollowing] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const toggleOptions = () => {
    setExpanded(previousState => !previousState);
  };

  const onFollowClick = () => {
    setFollowing(previousState => !previousState);
    setExpanded(previousState => !previousState);
  };

  const onBlockClick = () => {
    setBlocked(previousState => !previousState);
    setFollowing(previousState => !previousState);
    setExpanded(previousState => !previousState);
  };

  return (
    <>
      <Pressable
        style={[
          styles.container,
          blocked ? styles.containerGreyedOut : styles.containerNormal,
        ]}
        onPress={toggleOptions}
        disabled={blocked}
        testID="user-item">
        <View>
          <Image style={styles.image} source={{uri: user.profile_image}} />
        </View>
        <View style={styles.details}>
          <Text style={styles.detailsText}>{user.display_name}</Text>
          <Text style={styles.detailsText}>Reputation: {user.reputation}</Text>
        </View>
        {following && (
          <Image
            source={require('../../assets/star.png')}
            style={styles.starIcon}
            testID="star-follow"
          />
        )}
      </Pressable>
      {expanded && (
        <View style={styles.actionPanel}>
          <Button
            title={following ? 'Unfollow' : 'Follow'}
            onPress={onFollowClick}
          />
          <Button title="Block" onPress={onBlockClick} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: 'teal',
    borderRadius: 5,
    padding: 10,
  },
  containerGreyedOut: {
    opacity: 0.4,
  },
  containerNormal: {
    opacity: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  details: {
    marginLeft: 20,
  },
  detailsText: {
    marginTop: 5,
    color: 'white',
    fontSize: 17,
  },
  actionPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'teal',
    padding: 10,
    marginRight: 15,
    justifyContent: 'space-evenly',
    borderRadius: 5,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
});
