import React, { Fragment } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import StyledUsersList from '../elements/StyledUsersList';
import { Meteor } from 'meteor/meteor';
import { User } from '/imports/api/interfaces/user.interface';
import UserItem from './UserItem';
import _ from 'lodash';
import { IHandleUIClick } from '/imports/api/interfaces/functions.interface';

interface UserListProps {
  users?: User[];
  foundUsers?: User[];
  searchQuery?: string;
  onUserItemClick: IHandleUIClick;
};

const UsersList = ({ users , onUserItemClick }: UserListProps) => {
  const groupedUsers = _.groupBy(users, user => {
    return user.username?.toUpperCase()[0];
  });

  const newUsers = Object.keys(groupedUsers).map(letter => {
    return {
      letter,
      groupedUsers: groupedUsers[letter]
    }
  });

  const renderUserItem = (userList: User[]) => {
    return userList.map(user => {
      if(user && user.profile) {
        return (
          <UserItem
            key={user._id}
            id={user._id}
            actu={user.profile.actu}
            username={user.username}
            picture={user.profile?.picture}
            onUserItemClick={onUserItemClick}
          />
        )
      }
    });
  };

  const renderLetters = () => {
    return newUsers.map((newUser, index) => {
      return (
        <Fragment key={index}>
          <div className="letter">
            {newUser.letter}
          </div>
          {renderUserItem(newUser.groupedUsers)}
        </Fragment>
      )
    });
  };

  return (
    <StyledUsersList>
      {renderLetters()}
    </StyledUsersList>
  );
};

const withHOC = withTracker(({ searchQuery, foundUsers }: UserListProps) => {
  return {
    users: searchQuery === ""
    ? (
      Meteor.users.find({ _id: {
        $ne: Meteor.userId()! 
      }}, {
        sort: {
          username: 1
        }
      }).fetch()
    ) : (
      foundUsers
    )
  }
});

export default withHOC(UsersList);
