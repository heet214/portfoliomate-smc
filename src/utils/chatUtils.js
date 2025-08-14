/**
 * Creates a unique, consistent chat room ID from two user IDs.
 * This ensures that both users always open the same chat room.
 * @param {string} uid1 - The ID of the first user.
 * @param {string} uid2 - The ID of the second user.
 * @returns {string} The combined chat room ID.
 */
export const createChatRoomId = (uid1, uid2) => {
    if (!uid1 || !uid2) return null;
    // Sort the UIDs lexicographically to ensure consistency
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};
