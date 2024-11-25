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
                image: event.get("image")?.url(), // Fetch URL if it's a Parse.File
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
            onError(error); // Pass the error to the callback
        } else {
            throw error; // Optionally rethrow the error if no callback is provided
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
            console.log("User object fetched:", user);
            const userId = user ? user.id : null;
            const username = user ? user.get("username") : "Unknown";
            console.log("Username:", username);

            return {
                id: event.id,
                heading: event.get("heading"),
                description: event.get("description"),
                datetime: event.get("datetime"),
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
        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        query.equalTo("event_id", {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        });
        query.equalTo("user_id", {
            __type: "Pointer",
            className: "_User",
            objectId: userId,
        });


        const existingRecord = await query.first();
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




export const fetchParticipantCount = async (eventId) => {
    try {
        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        query.equalTo("event_id", {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        });

        const results = await query.find();
        const uniqueUserIds = new Set();

        results.forEach(record => {
            const userId = record.get("user_id")?.id;
            if (userId) {
                uniqueUserIds.add(userId);
            }
        });

        return uniqueUserIds.size;
    } catch (error) {
        console.error("Error fetching participant count:", error);
        return 0;
    }
};

export const fetchComments = async (eventId) => {
    const query = new Parse.Query("Comment");
    query.include("user_id"); // Include the user_id pointer to fetch user data
    query.equalTo("event_id", { __type: "Pointer", className: "Event", objectId: eventId });
    query.ascending("createdAt");

    try {
        const results = await query.find();
        return results.map(comment => ({
            commentId: comment.id,
            author: comment.get("user_id").get("username"), // Fetch the username
            userId: comment.get("user_id").id, // Fetch the user ID for validation
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



