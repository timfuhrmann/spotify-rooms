import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

exports.checkUpcomingTracks = functions.firestore
    .document("rooms/{roomId}/upcomingTracks/{docId}")
    .onCreate(async (change, context) => {
        const roomId = context.params.roomId;
        const data = change.data();

        const roomRef = await db.doc(`rooms/${roomId}`).get();
        const roomData = roomRef.data();

        if (roomData && roomData.activeTrack) {
            return null;
        }

        if (roomRef) {
            return roomRef.ref
                .update({ activeTrack: data, live: false })
                .then(() => {
                    change.ref.delete().catch(console.error);
                })
                .catch(console.error);
        } else {
            return null;
        }
    });
