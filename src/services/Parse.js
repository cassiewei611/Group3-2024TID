import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


export default Parse;

export const fetchAllEvents = async () => {
    try {
        const Event = Parse.Object.extend("Event");
        const query = new Parse.Query(Event);
        query.select("heading", "description", "datetime", "location", "petType", "image");
        const results = await query.find();

        return results.map(event => {
            const datetime = event.get("datetime");
            const date = datetime ? new Date(datetime).toISOString().split('T')[0] : null;
            const time = datetime ? new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

            return {
                id: event.id,
                title: event.get("heading"),
                description: event.get("description"),
                date,
                time,
                city: event.get("location"),
                petType: event.get("petType"),
                image: event.get("image")?.url(),
            };
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};



export const createEvent = async (eventData, userId, onError) => {
    try {
        const Event = Parse.Object.extend("Event");
        const newEvent = new Event();

        newEvent.set("heading", eventData.heading);
        newEvent.set("description", eventData.description);
        newEvent.set("datetime", eventData.datetime);
        newEvent.set("location", eventData.location);
        newEvent.set("petType", eventData.petType);

        if (eventData.image) {
            newEvent.set("image", eventData.image);
        }

        const userPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: userId,
        };
        newEvent.set("created_by", userPointer);

        await newEvent.save();
        console.log("Event created successfully!");
    } catch (error) {
        console.error("Error while creating event:", error);
        if (typeof onError === "function") {
            onError(error);
        } else {
            throw error;
        }
    }
};




export const fetchEventDetails = async (eventId) => {
    try {
        const Event = Parse.Object.extend("Event");
        const query = new Parse.Query(Event);

        query.equalTo("objectId", eventId);
        query.include("created_by");

        const event = await query.first();

        if (event) {
            const imageFile = event.get("image");
            const imageUrl = imageFile ? imageFile.url() : null;

            const user = event.get("created_by");

            const userId = user ? user.id : null;
            const username = user ? user.get("username") : "Unknown";

            const datetime = event.get("datetime");
            const date = datetime ? new Date(datetime).toISOString().split('T')[0] : null;
            const time = datetime ? new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

            return {
                id: event.id,
                heading: event.get("heading"),
                description: event.get("description"),
                date,
                time,
                location: event.get("location"),
                petType: event.get("petType"),
                image: imageUrl,
                createdBy: { id: userId, username },
            };
        } else {
            console.log("No event found with this ID");
            return null;
        }
    } catch (error) {
        console.error("Error fetching event details:", error);
        return null;
    }
};



export const checkUserInterest = async (eventId, userId) => {
    try {
        console.log("Checking interest - eventId:", eventId, "userId:", userId);

        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        const EventPointer = {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        };
        const UserPointer = {
            __type: "Pointer",
            className: "_User",
            objectId: userId,
        };

        query.equalTo("event_id", EventPointer);
        query.equalTo("user_id", UserPointer);

        const existingRecord = await query.first();
        console.log("Existing record for event and user:", existingRecord);

        return !!existingRecord;
    } catch (error) {
        console.error("Error checking user interest:", error);
        return false;
    }
};


export const handleParticipation = async (eventId, userId) => {
    console.log(`Event ID: ${eventId}, User ID: ${userId}`);

    try {
        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        const eventPointer = {
            __type: 'Pointer',
            className: 'Event',
            objectId: eventId
        };
        const userPointer = {
            __type: 'Pointer',
            className: '_User',
            objectId: userId
        };


        query.equalTo("event_id", eventPointer);
        query.equalTo("user_id", userPointer);

        const existingRecord = await query.first();
        console.log("Query result:", existingRecord);



        if (existingRecord) {
            console.log("Attempting to remove participation...");
            await existingRecord.destroy();
            console.log("Participation removed successfully!");
            return false;
        } else {
            console.log("No existing record found, creating new one...");
            const participation = new Participant();
            participation.set("event_id", eventPointer);
            participation.set("user_id", userPointer);

            await participation.save();
            console.log("Participation recorded successfully!");
            return true;
        }
    } catch (error) {
        console.error("Error while toggling participation:", error);
        return null;
    }
};



export const fetchEventParticipants = async (eventId) => {
    try {
        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        query.equalTo("event_id", {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        });


        query.include("user_id");
        query.select("user_id.username", "user_id.profileImage");

        const results = await query.find();


        return results.map((record) => {
            const user = record.get("user_id");
            return {
                userId: user?.id,
                username: user?.get("username"),
                avatar: user?.get("profileImage")?.url(),
            };
        });
    } catch (error) {
        console.error("Error fetching event participants:", error);
        return [];
    }
};


export const fetchComments = async (eventId) => {
    const query = new Parse.Query("Comment");
    query.include("user_id");
    query.equalTo("event_id", { __type: "Pointer", className: "Event", objectId: eventId });
    query.ascending("createdAt");

    try {
        const results = await query.find();
        return results.map(comment => ({
            commentId: comment.id,
            author: comment.get("user_id").get("username"),
            userId: comment.get("user_id").id,
            content: comment.get("content"),
            createdAt: comment.get("createdAt")
        }));

    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return [];
    }
};




export const saveComment = async (eventId, userId, content) => {
    const Comment = Parse.Object.extend("Comment");
    const comment = new Comment();

    comment.set("event_id", { __type: "Pointer", className: "Event", objectId: eventId });
    comment.set("user_id", { __type: "Pointer", className: "_User", objectId: userId });
    comment.set("content", content);

    try {
        await comment.save();

        const currentUser = await new Parse.Query("_User").get(userId);
        const username = currentUser.get("username");

        return {
            commentId: comment.id,
            author: username,
            content: content,
        };
    } catch (error) {
        console.error("Failed to save comment:", error);
        return null;
    }
};


export const handleDelete = async (commentId, currentUserId) => {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
        const Comment = Parse.Object.extend("Comment");
        const query = new Parse.Query(Comment);
        try {
            const comment = await query.get(commentId);

            const authorPointer = comment.get("user_id");
            console.log("Author Pointer:", authorPointer);
            if (!authorPointer) {
                alert("Author information is missing.");
                return false;
            }

            const authorId = authorPointer.id;
            console.log("Author ID:", authorId);
            console.log("Current User ID:", currentUserId);

            if (authorId !== currentUserId) {
                alert("You can only delete your own comments.");
                return false;
            }

            await comment.destroy();
            return true;
        } catch (error) {
            console.error("Failed to delete comment:", error);
            return false;
        }
    }
};

export const fetchInterestedEvents = async (userId) => {
    try {
        const Participant = Parse.Object.extend("Participant");
        const participantQuery = new Parse.Query(Participant);

        participantQuery.equalTo("user_id", {
            __type: "Pointer",
            className: "_User",
            objectId: userId,
        });
        participantQuery.include("event_id");

        const participantRecords = await participantQuery.find();

        const eventIds = participantRecords.map((record) => record.get("event_id").id);


        const Event = Parse.Object.extend("Event");
        const eventQuery = new Parse.Query(Event);
        eventQuery.containedIn("objectId", eventIds);
        eventQuery.include("created_by");
        eventQuery.select("heading", "description", "datetime", "location", "image", "petType");

        const results = await eventQuery.find();

        return results.map((event) => ({
            id: event.id,
            title: event.get("heading"),
            description: event.get("description"),
            date: event.get("datetime")
                ? new Date(event.get("datetime")).toISOString().split("T")[0]
                : null,
            time: event.get("datetime")
                ? new Date(event.get("datetime")).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : null,
            city: event.get("location"),
            image: event.get("image")?.url(),
            petType: event.get("petType"),
            createdBy: {
                id: event.get("created_by")?.id,
                username: event.get("created_by")?.get("username") || "Unknown",
            },
        }));
    } catch (error) {
        console.error("Error fetching interested events:", error);
        return [];
    }
};

export const fetchUserEvents = async (userId) => {
    try {
        const Event = Parse.Object.extend("Event");
        const query = new Parse.Query(Event);

        query.equalTo("created_by", {
            __type: "Pointer",
            className: "_User",
            objectId: userId,
        });
        query.include("created_by");
        query.select("heading", "description", "datetime", "location", "image", "petType");

        const results = await query.find();

        return results.map((event) => ({
            id: event.id,
            title: event.get("heading"),
            description: event.get("description"),
            date: event.get("datetime")
                ? new Date(event.get("datetime")).toISOString().split("T")[0]
                : null,
            time: event.get("datetime")
                ? new Date(event.get("datetime")).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : null,
            city: event.get("location"),
            image: event.get("image")?.url(),
            petType: event.get("petType"),
            createdBy: {
                id: event.get("created_by")?.id,
                username: event.get("created_by")?.get("username") || "Unknown",
            },
        }));
    } catch (error) {
        console.error("Error fetching user events:", error);
        return [];
    }
};

export const fetchUserInfo = async (userId) => {
    try {
        const User = Parse.Object.extend("_User");
        const query = new Parse.Query(User);
        query.equalTo("objectId", userId);

        const user = await query.first();
        if (user) {
            return {
                username: user.get("username"),
                email: user.get("email"),
                phone: user.get("phone"),
                description: user.get("description"),
                profileImage: user.get("profileImage")?.url(),
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};

