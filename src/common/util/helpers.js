export const createNewBand = (user, photoURL, band) => {
    return {
        ...band,
        organizer: user.uid,
        organizedBy: user.displayName,
        organizerPhotoURL: photoURL,
        fans: {
            [user.uid]: {
                member: true,
                displayName: user.displayName,
                photoURL: photoURL
            }
        }
    }
}