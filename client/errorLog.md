12:56:58 AM: [eslint]
12:56:58 AM: src/components/AllChats/AllChats.js
12:56:58 AM:   Line 27:8:  React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
12:56:58 AM: src/components/AllChats/ChatGroup/ChatGroup.js
12:56:58 AM:   Line 74:8:   React Hook useEffect has a missing dependency: 'roomId'. Either include it or remove the dependency array                                              react-hooks/exhaustive-deps
12:56:58 AM:   Line 89:8:   React Hook useEffect has missing dependencies: 'chatLog?.messagesArray' and 'messagesArrayLength'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
12:56:58 AM:   Line 110:8:  React Hook useEffect has missing dependencies: 'dispatch' and 'roomName'. Either include them or remove the dependency array                           react-hooks/exhaustive-deps
12:56:58 AM: src/components/AllModals/ChangeGroupChatIconModal/ChangeGroupChatIconModal.js
12:56:58 AM:   Line 1:10:  'useEffect' is defined but never used          no-unused-vars
12:56:58 AM:   Line 6:8:   'CancelRoundedIcon' is defined but never used  no-unused-vars
12:56:58 AM: src/components/AllModals/DeleteGroupModal/DeleteGroup.js
12:56:58 AM:   Line 7:8:  'CancelRoundedIcon' is defined but never used  no-unused-vars
12:56:58 AM: src/components/AllModals/LeaveGroupModal/LeaveGroupModal.js
12:56:58 AM:   Line 1:10:  'useState' is defined but never used           no-unused-vars
12:56:58 AM:   Line 5:8:   'CancelRoundedIcon' is defined but never used  no-unused-vars
12:56:58 AM: src/components/AllModals/RemoveUsersModal/RemoveUsersModal.js
12:56:58 AM:   Line 3:8:    'CloseRoundedIcon' is defined but never used  no-unused-vars
12:56:58 AM:   Line 16:11:  'userId' is assigned a value but never used   no-unused-vars
12:56:58 AM: src/components/AllModals/SettingsModal/SettingsUpdateProfilePic/SettingsUpdateProfilePic.js
12:56:58 AM:   Line 6:10:  'updateUserProfilePicture' is defined but never used  no-unused-vars
12:56:58 AM: src/components/Auth/Login/Login.js
12:56:58 AM:   Line 1:20:   'useEffect' is defined but never used              no-unused-vars
12:56:58 AM:   Line 43:23:  'errorCode' is assigned a value but never used     no-unused-vars
12:56:58 AM:   Line 44:23:  'errorMessage' is assigned a value but never used  no-unused-vars
12:56:58 AM: src/components/Avatar/Avatar.js
12:56:58 AM:   Line 33:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
12:56:58 AM:   Line 35:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
12:56:58 AM: src/components/CurrentChat/Chat/MessagesWindow.js
12:56:58 AM:   Line 6:10:   'useEffect' is defined but never used  no-unused-vars
12:56:58 AM:   Line 20:98:  Expected '===' and instead saw '=='    eqeqeq
12:56:58 AM: src/components/CurrentChat/ChatHeader/ChatHeader.js
12:56:58 AM:   Line 9:21:   Unexpected empty object pattern      no-empty-pattern
12:56:58 AM:   Line 15:77:  Expected '===' and instead saw '=='  eqeqeq
12:56:58 AM:   Line 41:29:  Expected '===' and instead saw '=='  eqeqeq
12:56:58 AM: src/components/CurrentChat/ChatHeaderMenu/ChatHeaderMenu.js
12:56:58 AM:   Line 9:8:  'ImageIcon' is defined but never used  no-unused-vars
12:56:58 AM: src/components/CurrentChat/MessageBubble/MessageBubble.js
12:56:58 AM:   Line 14:11:  'colorsArray' is assigned a value but never used                                                                                                      no-unused-vars
12:56:58 AM:   Line 25:71:  Expected '===' and instead saw '=='                                                                                                                   eqeqeq
12:56:58 AM:   Line 50:8:   React Hook useEffect has missing dependencies: 'activityLog', 'dispatch', 'roomId', and 'userId'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
12:56:58 AM: src/components/CurrentChat/MessageInput/MessageInput.js
12:56:58 AM:   Line 31:8:  React Hook useEffect has a missing dependency: 'setCurrentMessage'. Either include it or remove the dependency array. If 'setCurrentMessage' changes too often, find the parent component that defines it and wrap that definition in useCallback  react-hooks/exhaustive-deps
12:56:58 AM: src/components/CurrentChat/StartNewChat/StartNewChat.js
12:56:58 AM:   Line 3:23:  Unexpected empty object pattern  no-empty-pattern
12:56:58 AM: src/components/MainPage/MainPage.js
12:56:58 AM:   Line 5:10:  'useCallback' is defined but never used                                                                                                                                                                                        no-unused-vars
12:56:58 AM:   Line 5:34:  'useRef' is defined but never used                                                                                                                                                                                             no-unused-vars
12:56:58 AM:   Line 9:44:  'socketIoHeartbeat' is defined but never used                                                                                                                                                                                  no-unused-vars
12:56:58 AM:   Line 24:8:  React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array. Outer scope values like 'socket' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps
12:56:58 AM:   Line 39:8:  React Hook useEffect has missing dependencies: 'dispatch', 'roomsActivityLog', 'roomsArray', and 'transmissionIDs'. Either include them or remove the dependency array                                                         react-hooks/exhaustive-deps
12:56:58 AM:   Line 55:8:  React Hook useEffect has missing dependencies: 'dispatch' and 'userError'. Either include them or remove the dependency array                                                                                                  react-hooks/exhaustive-deps
12:56:58 AM:   Line 64:8:  React Hook useEffect has a missing dependency: 'loadChats'. Either include it or remove the dependency array                                                                                                                   react-hooks/exhaustive-deps
12:56:58 AM:   Line 84:8:  React Hook useEffect has missing dependencies: 'joinRoomsSocketIo' and 'leaveRoomsSocketIo'. Either include them or remove the dependency array                                                                                react-hooks/exhaustive-deps
12:56:58 AM:   Line 93:8:  React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array                                                                                                                    react-hooks/exhaustive-deps
12:56:58 AM: src/components/Modal/Modal.js
12:56:58 AM:   Line 17:77:  Expected '===' and instead saw '=='  eqeqeq
12:56:58 AM: src/components/NavBar/NavBar.js
12:56:58 AM:   Line 24:8:  React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
12:56:58 AM: src/firebase.js
12:56:58 AM:   Line 21:7:  'app' is assigned a value but never used  no-unused-vars
12:56:58 AM: src/functions/misc/formatDate.js
12:56:58 AM:   Line 46:11:  'days' is assigned a value but never used    no-unused-vars
12:56:58 AM:   Line 47:11:  'weeks' is assigned a value but never used   no-unused-vars
12:56:58 AM:   Line 48:11:  'months' is assigned a value but never used  no-unused-vars
12:56:58 AM:   Line 49:11:  'years' is assigned a value but never used   no-unused-vars
12:56:58 AM:   Line 51:14:  Expected '===' and instead saw '=='          eqeqeq
12:56:58 AM:   Line 54:14:  Expected '===' and instead saw '=='          eqeqeq
12:56:58 AM: src/functions/misc/searchInsertPosition.js
12:56:58 AM:   Line 5:63:  Expected '===' and instead saw '=='  eqeqeq
12:56:58 AM: src/functions/rooms/createNewRoomAndSyncData.js
12:56:58 AM:   Line 1:10:  'getUserByMongoDbUserId' is defined but never used   no-unused-vars
12:56:58 AM:   Line 2:25:  'getRoomsByMongoDbUserId' is defined but never used  no-unused-vars
12:56:58 AM:   Line 3:10:  'getNewChatLogData' is defined but never used        no-unused-vars
12:56:58 AM: src/functions/rooms/deleteRoomAndSyncData.js
12:56:58 AM:   Line 1:10:  'getUserByMongoDbUserId' is defined but never used   no-unused-vars
12:56:58 AM:   Line 2:47:  'getRoomsByMongoDbUserId' is defined but never used  no-unused-vars
12:56:58 AM: src/functions/rooms/renameRoomAndSyncData.js
12:56:58 AM:   Line 1:10:  'getUserByMongoDbUserId' is defined but never used   no-unused-vars
12:56:58 AM:   Line 2:26:  'getRoomsByMongoDbUserId' is defined but never used  no-unused-vars
12:56:58 AM: src/functions/users/updateUsernameAndSyncData.js
12:56:58 AM:   Line 1:10:  'getUserByMongoDbUserId' is defined but never used  no-unused-vars
12:56:58 AM: src/redux/features/chatLogs/chatLogSlice.js
12:56:58 AM:   Line 133:78:  Expected '===' and instead saw '=='  eqeqeq
12:56:58 AM: src/redux/features/rooms/roomSlice.js
12:56:58 AM:   Line 359:25:  Unexpected use of comma operator  no-sequences
12:56:58 AM: src/redux/features/users/userSlice.js
12:56:58 AM:   Line 160:9:  Duplicate key 'updateUserCredentials'  no-dupe-keys