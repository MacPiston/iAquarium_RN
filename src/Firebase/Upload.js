import storage from '@react-native-firebase/storage';

function uploadAvatar(uid, file) {
  const storageRef = storage().ref(uid + '/avatar/avatar.jpg');

  return new Promise((resolve, reject) => {
    const task = storageRef.putFile(file);
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });
    task.catch((error) => {
      console.log(error);
      task.cancel();
      console.log('Upload failed!');
      reject('Upload failed!');
    });
    task.then(() => {
      console.log('Image uploaded to the bucket!');
      resolve();
    });
  });
}

export {uploadAvatar};
